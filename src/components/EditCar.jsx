// EditCar.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Admin from "../pages/admin/Admin";
import { toast } from "react-toastify";

const EditCar = () => {
  const navigate = useNavigate()
  const { id } = useParams(); // Get car ID from the URL
  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [city, setCity] = useState();
  const [category, setCategory] = useState();
  const [location, setLocation] = useState();
  const [mainImage, setMainImage] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [lastImage, setLastImage] = useState(null);
  const [load, setLoad] = useState(false)

  const [formData, setFormData] = useState({
    color: "",
    year: "",
    seconds: "",
    max_speed: "",
    max_people: "",
    transmission: "",
    motor: "",
    drive_side: "",
    petrol: "",
    limitperday: "",
    deposit: "",
    premium_protection: "",
    price_in_aed: "",
    price_in_usd: "",
    price_in_aed_sale: "",
    price_in_usd_sale: "",
    inclusive: false,
    brand_id: "",
    model_id: "",
    city_id: "",
    category_id: "",
    location_id: "",
  });

  // Fetch car data by ID
  useEffect(() => {
    if (id) {
      axios
        .get(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`)
        .then((res) => {
          const carData = res?.data?.data;
          if (carData) {
            setFormData(carData);
            setFormData((prevData) => ({
              ...prevData,
              ...carData, // Map car details to formData
            }));
          } else {
            console.error("Car data not found");
          }
        })
        .catch((error) => console.error("Error fetching car data: ", error));
    }
  }, [id]);

  // Fetch brand, model, city, and category options
  useEffect(() => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => setBrand(res?.data?.data));
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/models")
      .then((res) => setModel(res?.data?.data));
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
      .then((res) => setCity(res?.data?.data));
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
      .then((res) => setLocation(res?.data?.data));
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => setCategory(res?.data?.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMainImageChange = (e) => setMainImage(e.target.files[0]);
  const handleFirstImagesChange = (e) => setFirstImage(e.target.files[0]);
  const handleLastImagesChange = (e) => setLastImage(e.target.files[0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoad(true)
    const formDataToSend = new FormData();

    // Specify only the fields required by the backend
    const allowedFields = [
      "color",
      "year",
      "seconds",
      "max_speed",
      "max_people",
      "transmission",
      "motor",
      "drive_side",
      "petrol",
      "limitperday",
      "deposit",
      "premium_protection",
      "price_in_aed",
      "price_in_usd",
      "price_in_aed_sale",
      "price_in_usd_sale",
      "inclusive",
      "brand_id",
      "model_id",
      "city_id",
      "category_id",
      "location_id",
    ];

    // Append only allowed fields to formData
    Object.entries(formData).forEach(([key, value]) => {
      if (allowedFields.includes(key)) {
        formDataToSend.append(key, value);
      }
    });

    // Append images if they are selected
    if (mainImage) formDataToSend.append("cover", mainImage);
    if (firstImage) formDataToSend.append("images", firstImage);
    if (lastImage) formDataToSend.append("images", lastImage);

    const token = localStorage.getItem("access_token");

    axios
      .put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        navigate('/car')
      })
      .catch((error) => console.error("Error updating car: ", error));
  };

  return (
    <Admin
      content={
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Car</h2>
            <Link to="/car" className="text-red-500">
              ↻ Back
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-3 gap-5">
            {/* Price inputs */}
            {[
              "color",
              "year",
              "seconds",
              "max_speed",
              "max_people",
              "transmission",
              "motor",
              "drive_side",
              "petrol",
              "limitperday",
              "deposit",
              "premium_protection",
              "price_in_aed",
              "price_in_usd",
              "price_in_aed_sale",
              "price_in_usd_sale",
            ].map((field, idx) => (
              <label key={idx}>
                {field.replace("_", " ").toUpperCase()}:
                <input
                  type="text"
                  required
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
                />
              </label>
            ))}
            <label>
              Inclusive:
              <input
                type="checkbox"
                name="inclusive"
                checked={formData?.inclusive}
                onChange={handleInputChange}
                className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
              />
            </label>
            {/* Brand, Model, Category, City Selects */}
            {[
              { label: "Brand", name: "brand_id", options: brand },
              { label: "Location", name: "location_id", options: location },
              { label: "Category", name: "category_id", options: category },
              { label: "Model", name: "model_id", options: model },
              { label: "City", name: "city_id", options: city },
            ].map((select, idx) => (
              <select
                key={idx}
                name={select?.name}
                value={formData[select?.name]}
                onChange={handleInputChange}
                className="bg-slate-100 p-3 rounded-lg"
              >
                <option value="">Select {select.label}</option>
                {select?.options?.map((item) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name || item?.title || item?.name_en}
                  </option>
                ))}
              </select>
            ))}
            {/* Image Inputs */}
            <label>
              Main Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
              />
            </label>
            <label>
              First image:
              <input
                type="file"
                accept="image/*"
                onChange={handleFirstImagesChange}
              />
            </label>
            <label>
              Last image:
              <input
                type="file"
                accept="image/*"
                onChange={handleLastImagesChange}
              />
            </label>
            <div className="mt-4 flex justify-end">
              <button className="mr-4 bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
              <button
                type="submit"
                disabled={load}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {load ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      }
    />
  );
};

export default EditCar;
