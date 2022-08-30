import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import Spinner from "../Spinner";

const ConfirmedTable = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const onCheckIn = (reserve) => {
    setIsLoading(true);
    const reserveData = {
      reserveId: reserve,
    };
    axios
      .post(`/hotel/bookings/check-in`, reserveData, config)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        if (res.status == 201) {
          navigate(`/bookings/checked-in`);
          toast.success("Customer Checked In Successfully");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Error Occured, Please Try Again");
        console.log(error);
      });
  };
  if (isLoading) return <Spinner />;
  return (
    <div>
      <table>
        <caption>All Confirmed Bookings</caption>
        <thead>
          <tr style={{ backgroundColor: "#f8f8f8" }}>
            {/* <th scope="col">Booking ID</th> */}
            <th scope="col">Amount</th>
            <th scope="col">CheckInDate</th>
            <th scope="col">checkOutDate</th>
            <th scope="col">No of Nights</th>
            <th scope="col">Booking Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {/* <td data-label="Name">{item.transId}</td> */}
              <td data-label="Price">{item.amount}</td>
              <td data-label="Rooms">{item.checkInDate}</td>
              <td data-label="Max Persons">{item.checkOutDate}</td>
              <td data-label="Max Persons">{item.nights}</td>
              <td data-label="Max Persons">{item.createdAt}</td>
              <td data-label="Actions" className="flex space-x-5">
                <Link
                  to={`/bookings/details/${item._id}`}
                  className="btn text-white"
                >
                  Details
                </Link>
                <button
                  // to={{
                  //   pathname: `/bookings/confirm-booking/${item.categoryId}`,
                  //   state: { userId: "item.userId" },
                  // }}
                  onClick={() => onCheckIn(item._id)}
                  className="btn bg-green-500"
                  style={{ borderColor: "transparent" }}
                >
                  Check In
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmedTable;
