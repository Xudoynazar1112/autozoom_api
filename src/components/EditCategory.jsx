// EditCategoryModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCategoryModal = ({ isOpen, onClose, category, onUpdate }) => {
  const [updatedCategory, setUpdatedCategory] = useState({
    name_en: category?.name_en || "",
    name_ru: category?.name_ru || "",
    id: category?.id || null,
  });
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    // Reset the updatedCategory state whenever the modal opens with a different category
    setUpdatedCategory({
      name_en: category?.name_en || "",
      name_ru: category?.name_ru || "",
      id: category?.id || null,
    });
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSave = () => {
    if (!updatedCategory.name_en || !updatedCategory.name_ru) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name_en", updatedCategory.name_en);
    formData.append("name_ru", updatedCategory.name_ru);
    if (newImage) formData.append("images", newImage);

    const token = localStorage.getItem("access_token");

    axios
      .put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${updatedCategory.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        onUpdate(res.data.data);
        onClose();
      })
      .catch((error) => console.error("Error updating category: ", error));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded-md w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit category</h2>
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
                value={updatedCategory.name_en}
                onChange={handleInputChange}
                className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
              />
            </label>
            <label>
              Name - Ru:
              <input
                type="text"
                name="name_ru"
                value={updatedCategory.name_ru}
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
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategoryModal;
