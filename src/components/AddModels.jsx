import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddModels = ({ isOpen, onClose, onAdd }) => {
  const [categoryData, setCategoryData] = useState({ name: "", brand_id: "" });
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => setList(res?.data?.data))
      .catch((error) => console.log("Error fetching categories: ", error));
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandChange = (e) => {
    setCategoryData((prev) => ({ ...prev, brand_id: e.target.value }));
  };

  console.log(categoryData);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("brand_id", categoryData.brand_id);

    const token = localStorage.getItem("access_token");

    axios
      .post("https://autoapi.dezinfeksiyatashkent.uz/api/models", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        onAdd(res?.data?.data);
        onClose();
        toast.success(res?.data?.message);
      })
      .catch((error) => console.error("Error adding category: ", error));
  };

  console.log(list);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add category</h2>
            <button onClick={onClose} className="text-red-500">
              X
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-5">
            <label>
              Name:
              <input
                type="text"
                name="name"
                required
                value={categoryData.name}
                onChange={handleInputChange}
                className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
              />
            </label>
            <h2>Brand name:</h2>
            <select
              className="bg-slate-100 p-3 rounded-lg"
              id="brand"
              name="brand_id"
              value={categoryData.brand_id}
              onChange={handleBrandChange}
            >
              {list.map((item, index) => (
                <option
                  className="hover:bg-blue-500"
                  key={index}
                  value={item?.id}
                >
                  {item?.title}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="mr-4 bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddModels;
