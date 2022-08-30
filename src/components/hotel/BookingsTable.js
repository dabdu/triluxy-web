import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrView } from "react-icons/gr";

const BookingsTable = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);
  return (
    <div>
      <table>
        <caption>All Available Bookings</caption>
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
                  onClick={() => {
                    navigate(`/bookings/confirm-booking/${item.categoryId}`, {
                      state: { userId: item.userId, reserveId: item._id },
                    });
                  }}
                  className="btn bg-green-500"
                  style={{ borderColor: "transparent" }}
                >
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
