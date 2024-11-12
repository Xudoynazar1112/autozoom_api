import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Cars = () => {
  const [list, setList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const token = localStorage.getItem("access_token");

  // Get all categories from db
  useEffect(() => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((res) => setList(res?.data?.data))
      .catch((error) => console.log("Error fetching categories: ", error));
  }, []);

  // Open Edit Modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  // Delete category function
  const handleDelete = (id) => {
    axios
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => toast.success(res?.data?.message))
      .catch((error) => console.log("Error deleting category: ", error));
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Update Category function
  const handleUpdateCategory = (updatedCategory) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === updatedCategory.id ? updatedCategory : item
      )
    );
    setIsEditModalOpen(false);
  };
  console.log(list);

  const data = (
    <>
      <Link
        to="/car/add"
        className="bg-blue-500 text-white cursor-pointer py-2 px-4 rounded hover:bg-transparent hover:text-blue-500"
      >
        Add Car
      </Link>

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Rang</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Categorya</th>
            <th>Lokatsiya</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.color}</td>
              <td>{item.title}</td>
              <td>{item.title}</td>
              <td>{item.title}</td>
              <td>{item.title}</td>
              <td>
                <button
                  onClick={() => openEditModal(item)}
                  className="text-green-500 text-2xl bg-transparent "
                >
                  <LuFolderEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 text-2xl bg-transparent"
                >
                  <ImBin />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );

  return (
    <>
      <Admin content={data} /> {/* Edit Category Modal */}
      {/* <EditBrands
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        brand={selectedCategory}
        onUpdate={handleUpdateCategory}
      /> */}
      {/* Add Category Modal */}
      {/* <AddBrands
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCategory}
      /> */}
    </>
  );
};

export default Cars;
