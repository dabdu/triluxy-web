import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  BookingsTable,
  ConfirmedTable,
  ReservationSideBar,
} from "../../../components/hotel";
import { DashboardContainer, Spinner, TitleHeader } from "../../../components";

function Confirmed() {
  const [confirmed, setConfirmed] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(`/hotel/bookings/confirmed`, config)
      .then((res) => {
        setConfirmed(res.data);
      })
      .catch((err) => {
        toast.error(
          "Error, While Fetching Confirmed Hotel Bookings, Please Refresh the Page"
        );
        console.log(err);
      });
    return () => {
      setConfirmed([]);
    };
  }, []);
  if (!confirmed) return <Spinner />;
  console.log(confirmed);
  return (
    <DashboardContainer>
      <div className="p-8 flex space-x-8">
        {/* <h1>Manage Categories</h1> */}
        {/* New Category Form */}
        {/* Hotel Info */}
        <div>
          <ReservationSideBar active={"confirmed"} />
        </div>
        <div>
          {/* Categories List */}
          {confirmed.length > 0 ? (
            <ConfirmedTable data={confirmed} />
          ) : (
            <TitleHeader text={"You Have No Confirmed Bookings"} />
          )}
        </div>
      </div>
    </DashboardContainer>
  );
}

export default Confirmed;
