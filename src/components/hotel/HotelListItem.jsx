import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../../constants/theme";

const HotelListItem = ({ data }) => {
  const { _id, hotelName, fImg, state, town, address } = data;
  return (
    <div
      style={{ backgroundColor: "#f3f3f3", width: 200 }}
      className=" shadow-md rounded-lg "
    >
      <img
        src={fImg}
        style={{
          height: 130,
          width: "100%",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
      <div style={{}} className="p-2">
        <h1 style={{ color: colors.primary, fontWeight: "600" }}>
          {hotelName}
        </h1>
        <p style={{}} className="text-xs font-medium, my-2 leading-5">
          Location:
          {`${address}, ${town}, ${state}.`}
        </p>
        <Link to={`/hotel/${_id}`} style={{ width: "100%" }} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};

export default HotelListItem;
