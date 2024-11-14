import React, { useEffect, useState } from "react";
import Admin from "../pages/admin/Admin";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddCars = () => {
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
  const navigate = useNavigate()

  // Fetch data for brand, model, city, and category
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

  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleFirstImagesChange = (e) => {
    setFirstImage(e.target.files[0]);
  };

  const handleLastImagesChange = (e) => {
    setLastImage(e.target.files[0]);
  };


  const handleSubmit = (event) => {
    event.preventDefault()
    setLoad(true)
    const formDataToSend = new FormData();
    formDataToSend.append("color", formData.color);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("seconds", formData.seconds);
    formDataToSend.append("max_speed", formData.max_speed);
    formDataToSend.append("max_people", formData.max_people);
    formDataToSend.append("transmission", formData.transmission);
    formDataToSend.append("motor", formData.motor);
    formDataToSend.append("drive_side", formData.drive_side);
    formDataToSend.append("petrol", formData.petrol);
    formDataToSend.append("limitperday", formData.limitperday);
    formDataToSend.append("deposit", formData.deposit);
    formDataToSend.append("premium_protection", formData.premium_protection);
    formDataToSend.append("price_in_aed", formData.price_in_aed);
    formDataToSend.append("price_in_usd", formData.price_in_usd);
    formDataToSend.append("price_in_aed_sale", formData.price_in_aed_sale);
    formDataToSend.append("price_in_usd_sale", formData.price_in_usd_sale);
    formDataToSend.append("inclusive", formData.inclusive);
    formDataToSend.append("brand_id", formData.brand_id);
    formDataToSend.append("model_id", formData.model_id);
    formDataToSend.append("city_id", formData.city_id);
    formDataToSend.append("location_id", formData.location_id);
    formDataToSend.append("category_id", formData.category_id);
    if (mainImage) formDataToSend.append("cover", mainImage);
    if (firstImage) formDataToSend.append("images", firstImage);
    if (lastImage) formDataToSend.append("images", lastImage);

    const token = localStorage.getItem("access_token");

    axios
      .post(
        "https://autoapi.dezinfeksiyatashkent.uz/api/cars",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.message)
        navigate('/car')
      })
      .catch((error) => console.error("Error adding car: ", error));
  };

  const data = (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Add Car</h2>
        <Link to="/car" className="text-red-500">
          ↻ Ortga
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-3  gap-5">
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
            checked={formData.inclusive}
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
              <option key={item.id} value={item.id}>
                {item.name || item.title || item.name_en}
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
          <button className="mr-4 bg-gray-300 px-4 py-2 rounded">Cancel</button>
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
  );

  return <Admin content={data} />;
};

export default AddCars;
