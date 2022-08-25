import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DashboardContainer, Spinner } from "../components";
import { HotelDashboard } from "./hotels";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  if (!user) {
    return <Spinner />;
  }
  // if (user.userRole === "hotelAdmin") {
  //   return <HotelDashboard />;
  // }
  return <DashboardContainer></DashboardContainer>;
}

export default Dashboard;
