import axios from "axios";
import React, { useState } from "react";

const AddLocations = ({ isOpen, onClose, onAdd }) => {
  const [categoryData, setCategoryData] = useState({ name: "", text: "" });
  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false)

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoad(true)
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("text", categoryData.text);
    if (image) formData.append("images", image);

    const token = localStorage.getItem("access_token");

    axios
      .post("https://autoapi.dezinfeksiyatashkent.uz/api/locations", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        onAdd(res?.data?.data);
        onClose();
        toast.success(res?.data?.message);
      })
      .catch((error) => console.error("Error adding category: ", error));
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-white dark:bg-opacity-50 bg-opacity-50">
        <div className="bg-white dark:bg-black dark:text-white p-4 rounded-md w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add Location</h2>
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
                value={categoryData.name}
                onChange={handleInputChange}
                className="bg-slate-100 text-black p-1 rounded-lg px-3 ml-3"
              />
            </label>
            <label>
              Text:
              <input
                type="text"
                name="text"
                value={categoryData.text}
                onChange={handleInputChange}
                className="bg-slate-100 text-black p-1 rounded-lg px-3 ml-3"
              />
            </label>
            <label>
              Image:
              <input
                type="file"
                onChange={handleImageChange}
                className="p-1 rounded-lg px-3 ml-3"
              />
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
              disabled={load}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {load ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLocations;
