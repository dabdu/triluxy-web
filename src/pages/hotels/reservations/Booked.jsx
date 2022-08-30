import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BookingsTable, ReservationSideBar } from "../../../components/hotel";
import { DashboardContainer, Spinner, TitleHeader } from "../../../components";

function Booked() {
  const [booked, setBooked] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(`/hotel/bookings`, config)
      .then((res) => {
        setBooked(res.data);
      })
      .catch((err) => {
        toast.error(
          "Error, While Fetching Hotel Bookings, Please Refresh the Page"
        );
        console.log(err);
      });

    return () => {
      setBooked([]);
    };
  }, []);
  if (!booked) return <Spinner />;
  return (
    <DashboardContainer>
      <div className="p-8 flex space-x-8">
        {/* <h1>Manage Categories</h1> */}
        {/* New Category Form */}
        {/* Hotel Info */}
        <div>
          <ReservationSideBar active={"bookings"} />
        </div>
        <div>
          {/* Categories List */}
          {booked.length > 0 ? (
            <BookingsTable data={booked} />
          ) : (
            <TitleHeader text={"You Have No Bookings"} />
          )}
        </div>
      </div>
    </DashboardContainer>
  );
}

export default Booked;
