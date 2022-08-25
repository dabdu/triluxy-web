import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DashboardContainer, Spinner } from "../../components";
import SetupHotel from "./SetupHotel";

function HotelDashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Spinner />;
  }
  if (user.userStatus === "newHotelAdmin") return <SetupHotel />;
  return <DashboardContainer></DashboardContainer>;
}

export default HotelDashboard;
