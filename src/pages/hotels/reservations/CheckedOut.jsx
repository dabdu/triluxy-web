import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { CategoryTable, ReservationSideBar } from "../../../components/hotel";
import { DashboardContainer, TitleHeader } from "../../../components";



function CheckedOut() {
  const [booked, setBooked] = useState([])

  const { user } = useSelector((state) => state.auth);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  useEffect(() => {
//       axios
//       .get(`/category/allcategories/${params?.id}`,config)
//       .then((res) => {
//         setCategories(res.data);
//       })
//       .catch((err) => {
//         toast.error("Error, While Fetching Hotels Categories, Please Refresh the Page");
//         console.log(err);
//       });

//   return () => {
//     setCategories([])
//   };
}, []);
  return (
    <DashboardContainer>
      <div className="p-8 flex space-x-8">
        {/* <h1>Manage Categories</h1> */}
        {/* New Category Form */}
        {/* Hotel Info */}
        <div>
          <ReservationSideBar active={"checkedout"} />
        </div>
        <div>
          {/* Categories List */}
          {booked.length > 0 ? (<CategoryTable data={booked} />) : (<TitleHeader text={"You Have No Bookings"} />)}
                
        </div>

      </div>
    </DashboardContainer>
  );
}

export default CheckedOut;
