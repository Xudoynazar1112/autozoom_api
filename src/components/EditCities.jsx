import axios from "axios";
import React, { useEffect, useState } from "react";

const EditCities = ({ isOpen, onClose, city, onUpdate }) => {
  const [load, setLoad] = useState(false)
  const [updatedCategory, setUpdatedCategory] = useState({
    name: city?.name || "",
    text: city?.text || "",
    id: city?.id || null,
  });
  const [newImage, setNewImage] = useState(null);  

  useEffect(() => {
    // Reset the updatedCategory state whenever the modal opens with a different category
    setUpdatedCategory({
      name: city?.name || "",
      text: city?.text || "",
      id: city?.id || null,
    });
  }, [city]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSave = (e) => {
    e.preventDefault()
    if (!updatedCategory.name || !updatedCategory.text) {
      toast.warn("Please fill in all fields");
      return;
    }
    setLoad(true)

    const formData = new FormData();
    formData.append("name", updatedCategory.name);
    formData.append("text", updatedCategory.text);
    if (newImage) formData.append("images", newImage);

    const token = localStorage.getItem("access_token");

    axios
      .put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${updatedCategory.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        onUpdate(res?.data?.data);
        onClose();
        toast.success(res?.data?.message);
      })
      .catch((error) => console.error("Error updating category: ", error));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-white dark:bg-opacity-50 bg-opacity-50">
        <div className="bg-white dark:bg-black dark:text-white p-4 rounded-md w-1/2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit City</h2>
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
                value={updatedCategory.name}
                onChange={handleInputChange}
                className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
              />
            </label>
            <label>
              Text:
              <input
                type="text"
                name="text"
                value={updatedCategory.text}
                onChange={handleInputChange}
                className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
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
              onClick={handleSave}
              disabled={load}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {load ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCities;
