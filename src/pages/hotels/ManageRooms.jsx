import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardContainer, Spinner, TitleHeader } from "../../components";
import { CategoryTable, NewCatergoryForm, RoomTable } from "../../components/hotel";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";



function ManageCategory() {
  const [rooms, setRooms] = useState([])

  // const hotelId = params?.id;
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  useEffect(() => {
      axios
      .get(`/category/${params?.id}/rooms`,config)
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        toast.error("Error, While Fetching Categories Rooms, Please Refresh the Page");
        console.log(err);
      });

  return () => {
    setRooms([])
  };
}, [params?.id]);
console.log(rooms)
  return (
    <DashboardContainer>
      <div className="p-8 flex space-x-8 pl-40">
        {/* <h1>Manage Categories</h1> */}
        {/* New Category Form */}
        {/* Hotel Info */}
        {/* <div>
          <h1>Hotel Info</h1>
        </div> */}
        <div>
        <Link to={`/hotel/${params?.id}/add-room`} className="btn">
          Add New Room to This  Category
        </Link>
          {/* Categories List */}
          {rooms.length > 0 ? (<RoomTable data={rooms} />) : (<TitleHeader text={"You Have No Room in this Category"} />)}
                
        </div>

      </div>
    </DashboardContainer>
  );
}

export default ManageCategory;
