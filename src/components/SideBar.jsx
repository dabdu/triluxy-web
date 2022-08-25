import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { SideBarItem } from "./";

function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
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
        // position: "fixed",
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
          <SideBarItem
            text={"Manage Bookings"}
            onClick={() => navigate("manage-bookings")}
          />
          <SideBarItem
            text={"Manage Hotels"}
            onClick={() => navigate("/manage-hotels")}
          />
          <SideBarItem
            text={"Add Hotel"}
            onClick={() => navigate("/add-hotel")}
          />
        </div>
      </div>
      <SideBarItem text={"Logout"} onClick={onLogout} />
    </div>
  );
}

export default SideBar;
