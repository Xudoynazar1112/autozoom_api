import { Route, Routes } from "react-router-dom";
import Login from "./pages/registeration/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Home from "./pages/home/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin/Admin";
import Categories from "./pages/admin/Categories";
import Brands from "./pages/admin/Brands";
import Models from "./pages/admin/Models";
import Locations from "./pages/admin/Locations";
import Cities from "./pages/admin/Cities";
import Cars from "./pages/admin/Cars";
import AddCars from "./components/AddCars";

function App() {
  return (
    <>
      <ToastContainer />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="*" element={<h1 className="flex justify-center items-center">Sahifa topilmadi</h1>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brand"
            element={
              <ProtectedRoute>
                <Brands />
              </ProtectedRoute>
            }
          />
          <Route
            path="/model"
            element={
              <ProtectedRoute>
                <Models />
              </ProtectedRoute>
            }
          />
          <Route
            path="/location"
            element={
              <ProtectedRoute>
                <Locations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/city"
            element={
              <ProtectedRoute>
                <Cities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/car"
            element={
              <ProtectedRoute>
                <Cars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/car/add"
            element={
              <ProtectedRoute>
                <AddCars />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
