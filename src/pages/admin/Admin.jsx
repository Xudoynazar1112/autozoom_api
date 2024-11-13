import React, { useState } from "react";
import { FaChartPie, FaSignOutAlt, FaSun } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { SiThemodelsresource } from "react-icons/si";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";

import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { Link, Navigate, useLocation } from "react-router-dom";
import { MdNightsStay } from "react-icons/md";

const Admin = ({ content }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };
  const Logout = () => {
    localStorage.removeItem("access_token");
    <Navigate to={"/login"} />;
  };
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen flex bg-white text-black dark:bg-black dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 font-bold text-2xl">AutoZoom Admin</div>
        <nav className="mt-10">
          <Link
            to="/category"
            className={`flex items-center p-2 my-4 ${
              isActive("/category")
                ? "bg-gray-700"
                : "text-gray-200 hover:bg-gray-700"
            } rounded-lg`}
          >
            <BiSolidCategory className="mr-2" /> Categories
          </Link>
          <Link
            to="/brand"
            className={`flex items-center p-2 my-4 ${
              isActive("/brand")
                ? "bg-gray-700"
                : "text-gray-200 hover:bg-gray-700"
            } rounded-lg`}
          >
            <FaPython className="mr-2" /> Brands
          </Link>
          <Link
            to="/model"
            className={`flex items-center p-2 my-4 ${
              isActive("/model")
                ? "bg-gray-700"
                : "text-gray-200 hover:bg-gray-700"
            } rounded-lg`}
          >
            <SiThemodelsresource className="mr-2" /> Models
          </Link>
          <Link
            to="/location"
            className={`flex items-center p-2 my-4 ${
              isActive("/location")
                ? "bg-gray-700"
                : "text-gray-200 hover:bg-gray-700"
            } rounded-lg`}
          >
            <FaMapLocationDot className="mr-2" /> Locations
          </Link>
          <Link
            to="/city"
            className={`flex items-center p-2 my-4 ${
              isActive("/city")
                ? "bg-gray-700"
                : "text-gray-200 hover:bg-gray-700"
            } rounded-lg`}
          >
            <FaCity className="mr-2" /> Cities
          </Link>
          <Link
            to="/car"
            className={`flex items-center p-2 my-4 ${
              isActive("/car") || isActive("/car/add")
                ? "bg-gray-700"
                : "text-gray-200 hover:bg-gray-700"
            } rounded-lg`}
          >
            <IoCarSport className="mr-2" /> Cars
          </Link>
          <Link
            to="/"
            className="flex items-center p-2 my-4 text-gray-200 hover:bg-gray-700 rounded-lg"
            onClick={Logout}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white dark:bg-gray-700 dark:text-slate-50 p-4 shadow-md">
          <div className="flex items-center dark:bg-slate-500 rounded px-3">
            <FaSearch className="text-gray-800 mr-3" />
            <input
              type="text"
              placeholder="Type to search..."
              className="outline-none border-none focus:ring-0 p-1 px-5 rounded dark:bg-slate-500 dark:text-slate-100"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-1 mr-2 dark:text-white dark:bg-slate-700 md:text-3xl text-xl rounded"
            >
              {darkMode ? <FaSun /> : <MdNightsStay />}
            </button>
            <FaBell className="text-gray-500 mx-4" />
            <FaUserCircle className="text-gray-500 mx-4 text-2xl" />
            <span className="text-gray-800 dark:text-white">Admin</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {content ? (
            content
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Dashboard
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded-lg shadow-md">Card 1</div>
                <div className="p-4 bg-white rounded-lg shadow-md">Card 2</div>
                <div className="p-4 bg-white rounded-lg shadow-md">Card 3</div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
