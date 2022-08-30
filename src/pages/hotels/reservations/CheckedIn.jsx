import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CheckedInTable, ReservationSideBar } from "../../../components/hotel";
import { DashboardContainer, TitleHeader } from "../../../components";

function CheckedIn() {
  const [checkedinData, setCheckedinData] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(`/hotel/bookings/check-in`, config)
      .then((res) => {
        setCheckedinData(res.data);
      })
      .catch((err) => {
        toast.error(
          "Error, While Fetching Checked In Reservation, Please Refresh the Page"
        );
        console.log(err);
      });
    return () => {
      setCheckedinData([]);
    };
  }, []);
  return (
    <DashboardContainer>
      <div className="p-8 flex space-x-8">
        {/* <h1>Manage Categories</h1> */}
        {/* New Category Form */}
        {/* Hotel Info */}
        <div>
          <ReservationSideBar active={"checkedin"} />
        </div>
        <div>
          {/* Table List */}
          {checkedinData.length > 0 ? (
            <CheckedInTable data={checkedinData} />
          ) : (
            <TitleHeader text={"You Have No Checked In Reservations"} />
          )}
        </div>
      </div>
    </DashboardContainer>
  );
}

export default CheckedIn;
