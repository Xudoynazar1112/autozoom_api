// AddCategoryModal.jsx
import React, { useState } from "react";
import axios from "axios";

const AddCategory = ({ isOpen, onClose, onAdd }) => {
  const [categoryData, setCategoryData] = useState({ name_en: "", name_ru: "" });
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name_en", categoryData.name_en);
    formData.append("name_ru", categoryData.name_ru);
    if (image) formData.append("images", image);

    const token = localStorage.getItem("access_token");

    axios
      .post("https://autoapi.dezinfeksiyatashkent.uz/api/categories", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        onAdd(res.data.data);
        onClose();
      })
      .catch((error) => console.error("Error adding category: ", error));
  };

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white flex flex-col p-4 rounded-md w-1/3 gap-3">
        <h2>Add Category</h2>
        <label>
          Name - En:
          <input type="text" name="name_en" value={categoryData.name_en} onChange={handleInputChange} />
        </label>
        <label>
          Name - Ru:
          <input type="text" name="name_ru" value={categoryData.name_ru} onChange={handleInputChange} />
        </label>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
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
              Name - En:
              <input
                type="text"
                name="name_en"
                value={categoryData.name_en}
                onChange={handleInputChange}
                className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
              />
            </label>
            <label>
              Name - Ru:
              <input
                type="text"
                name="name_ru"
                value={categoryData.name_ru}
                onChange={handleInputChange}
                className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
              />
            </label>
            <label>
              Image:
              <input type="file" onChange={handleImageChange} className="p-1 rounded-lg px-3 ml-3" />
            </label>
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

export default AddCategory;
