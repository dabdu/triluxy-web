import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
import AdminSideBarItem from "./AdminSideBarItem";

function AdminSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "15%",
        backgroundColor: "#f8f8f8",
        position: "fixed",
      }}
      className="pl-2 pr-2"
    >
      {/* Sidebar Header */}
      <div className="mt-10">
        <h1>{user?.name}</h1>
      </div>
      {/* SideBar Item */}
      <div className=" border-t-orange-600 border-b-orange-600 border-t-2 border-b-2 py-3">
        <h1
          style={{
            fontSize: 17,
            color: "#015479",
            fontWeight: "500",
          }}
        >
          Hotels
        </h1>
        <div className="">
          <AdminSideBarItem
            text={"Manage Bookings"}
            onClick={() => navigate("manage-bookings")}
          />
          <AdminSideBarItem
            text={"Manage Hotels"}
            onClick={() => navigate("/admin/manage-hotels")}
          />
          <AdminSideBarItem
            text={"Add Hotel"}
            onClick={() => navigate("/admin/add-hotel")}
          />
        </div>
      </div>
      <AdminSideBarItem text={"Logout"} onClick={onLogout} />
    </div>
  );
}

export default AdminSideBar;
