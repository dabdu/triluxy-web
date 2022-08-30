import React from "react";
import { Link } from "react-router-dom";

const ReservationSideBar = ({ active }) => {
  let activeTab = {
    width: "100%",
    backgroundColor: "#1BC0DE",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: "0.5px",
    borderBottomColor: "#1BC0DE",
    fontWeight: "500",
    paddingTop: "5px",
    paddingBottom: "5px",
  };
  let inactiveTab = {
    width: "100%",
    backgroundColor: "#fff",
    color: "#1BC0DE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: "0.5px",
    borderBottomColor: "#1BC0DE",
    fontWeight: "500",
    paddingTop: "5px",
    paddingBottom: "5px",
  };
  // borderTopWidth: "0.5px", borderTopColor: "#1BC0DE",
  return (
    <ul
      style={{ width: "200px", borderRadius: "20px" }}
      className=" bg-slate-400 shadow-2xl rounded-full mx-auto my-5"
    >
      <li style={active === "bookings" ? activeTab : inactiveTab}>
        <Link
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to={"/bookings"}
        >
          Bookings
        </Link>
      </li>
      <li style={active === "confirmed" ? activeTab : inactiveTab}>
        <Link
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to={"/bookings/confirmed"}
        >
          Confirmed
        </Link>
      </li>
      <li style={active === "checkedin" ? activeTab : inactiveTab}>
        <Link
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          to={"/bookings/checked-in"}
        >
          Checked In
        </Link>
      </li>
      <li
        style={
          active === "checkedout"
            ? {
                width: "100%",
                backgroundColor: "#1BC0DE",
                color: "#fff",
                paddingTop: "5px",
                paddingBottom: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
              }
            : {
                width: "100%",
                backgroundColor: "#fff",
                color: "#1BC0DE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
              }
        }
      >
        <Link
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
          to={"/bookings/checked-out"}
        >
          Checked Out
        </Link>
      </li>
    </ul>
  );
};

export default ReservationSideBar;
