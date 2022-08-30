import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckedInTable = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <table>
        <caption>All Check In Reservation</caption>
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
                  onClick={() => {
                    navigate(`/bookings/check-out/${item.categoryId}`, {
                      state: { userId: item.userId, reserveId: item._id },
                    });
                  }}
                  className="btn bg-green-500"
                  style={{ borderColor: "transparent" }}
                >
                  Check Out
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckedInTable;
