import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const AddBrands = ({ isOpen, onClose, onAdd }) => {
    const [categoryData, setCategoryData] = useState({ title: ""});
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
      formData.append("title", categoryData.title);
      if (image) formData.append("images", image);
  
      const token = localStorage.getItem("access_token");
  
      axios
        .post("https://autoapi.dezinfeksiyatashkent.uz/api/brands", formData, {
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
        <div className="bg-white dark:bg-black dark:text-white flex flex-col p-4 rounded-md w-1/3 gap-3">
          <h2>Add Brand</h2>
          <label>
            Title:
            <input type="text" name="title" className='text-black' value={categoryData.name_en} onChange={handleInputChange} />
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
                Title:
                <input
                  type="text"
                  name="title"
                  value={categoryData.title}
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
}

export default AddBrands