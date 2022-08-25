import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  AddCategory,
  AddHotel,
  AddRoom,
  HotelRegister,
  ManageCategory,
  ManageHotels,
  ManageRooms,
} from "./pages/hotels";
import HotelContextProvider from "./Context/HotelContext";
function App() {
  return (
    <>
      <HotelContextProvider>
        <Router>
          <div className="">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Hotels Routes */}
              <Route path="/hotel-reg" element={<HotelRegister />} />
              <Route path="/hotel/:id" element={<ManageCategory />} />
              <Route path="/hotel/:id/add-category" element={<AddCategory />} />
              <Route path="/hotel/category/:id" element={<ManageRooms />} />
              <Route path="/hotel/:id/add-room" element={<AddRoom />} />

              {/* Admin Routes */}
              <Route path="/manage-bookings" element={<ManageCategory />} />
              <Route path="/manage-hotels" element={<ManageHotels />} />
              <Route path="/add-hotel" element={<AddHotel />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer />
      </HotelContextProvider>
    </>
  );
}

export default App;
