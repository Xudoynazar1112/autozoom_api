import React, { useEffect, useState } from 'react'
import Admin from './Admin'
import axios from 'axios';
import { EditModels } from '../../components/EditModels';
import AddModels from '../../components/AddModels';
import { ImBin } from 'react-icons/im';
import { LuFolderEdit } from 'react-icons/lu';
import { toast } from 'react-toastify';

const Models = () => {
  const [list, setList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const token = localStorage.getItem("access_token");

  // Get all categories from db
  useEffect(() => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/models")
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
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
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
        Add Model
      </button>

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Model name</th>
            <th>Brand name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.brand_title}</td>
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
// console.log(selectedCategory);

  return (
    <>
      <Admin content={data} />
       {/* Edit Model Modal */}
      <EditModels
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        model={selectedCategory}
        onUpdate={handleUpdateCategory}
      />
      {/* Add Model Modal */}
      <AddModels
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCategory}
      />
    </>
  );
}

export default Models