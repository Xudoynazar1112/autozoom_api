import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export const EditModels = ({ isOpen, onClose, model, onUpdate }) => {
  const [updatedCategory, setUpdatedCategory] = useState({
    title: model?.name || "",
    brand_id: model?.brand_id || "",
    id: model?.id || null,
  });
  const [list, setList] = useState([])

  useEffect(() => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((res) => setList(res?.data?.data))
      .catch((error) => console.log("Error fetching categories: ", error));
  }, []);

  useEffect(() => {
    // Reset the updatedCategory state whenever the modal opens with a different category
    setUpdatedCategory({
      name: model?.name || "",
      brand_id: model?.brand_id || "",
      id: model?.id || null,
    });
  }, [model]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!updatedCategory.name) {
      toast.warn("Please fill in field");
      return;
    }

    const formData = new FormData();
    formData.append("name", updatedCategory.name);
    formData.append("brand_id", updatedCategory.brand_id);

    const token = localStorage.getItem("access_token");
    console.log(updatedCategory.name, updatedCategory.brand_id);
    

    axios
      .put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${updatedCategory.id}`,
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
      })
      .catch((error) => console.error("Error updating category: ", error));
  };
  // console.log(list);
  
  

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
              Model name:
              <input
                type="text"
                name="name"
                value={updatedCategory?.name}
                onChange={handleInputChange}
                className="bg-slate-100 p-1 rounded-lg px-3 ml-3"
              />
            </label>
            <h2>Brand name:</h2>
            <select className="bg-slate-100 p-3 rounded-lg" id='select'>
              {list.map((item, index) => (
                <option className="hover:bg-blue-500" key={index} value={item?.id}>{item?.title}</option>
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
}
