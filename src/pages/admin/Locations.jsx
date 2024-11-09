import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import EditLocations from '../../components/EditLocations';
import AddLocations from '../../components/AddLocations';
import { ImBin } from 'react-icons/im';
import { LuFolderEdit } from 'react-icons/lu';
import { toast } from 'react-toastify';
import axios from 'axios';

const Locations = () => {
  const [list, setList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const token = localStorage.getItem("access_token");

  // Get all categories from db
  useEffect(() => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
      .then((res) => setList(res?.data?.data))
      .catch((error) => console.log("Error fetching categories: ", error));
  }, []);

  // Open Edit Modal
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  // Open Add Category Modal
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  // Delete category function
  const handleDelete = (id) => {
    axios
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api/locations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => toast.success(res?.data?.message))
      .catch((error) => console.log("Error deleting category: ", error));
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Add Category function
  const handleAddCategory = (newCategory) => {
    setList((prevList) => [...prevList, newCategory]);
    setIsAddModalOpen(false);
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
      <button
        onClick={openAddModal}
        className="bg-blue-500 text-white cursor-pointer"
      >
        Add Category
      </button>

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Text</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.slug}</td>
              <td>{item.text}</td>
              <td className="flex justify-center items-center border-none">
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
                  alt={item.name_en}
                  width="90"
                  height="90"
                />
              </td>
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
console.log(selectedCategory);

  return (
    <>
      <Admin content={data} /> {/* Edit Category Modal */}
      <EditLocations
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        location={selectedCategory}
        onUpdate={handleUpdateCategory}
      />
      {/* Add Category Modal */}
      <AddLocations
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </>
  );
}

export default Locations