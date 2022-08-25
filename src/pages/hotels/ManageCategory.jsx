import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardContainer, Spinner, TitleHeader } from "../../components";
import { CategoryTable, NewCatergoryForm } from "../../components/hotel";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";



function ManageCategory() {
  const [categories, setCategories] = useState([])

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
      .get(`/category/allcategories/${params?.id}`,config)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error("Error, While Fetching Hotels Categories, Please Refresh the Page");
        console.log(err);
      });

  return () => {
    setCategories([])
  };
}, [params?.id]);
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
        <Link to={`/hotel/${params?.id}/add-category`} className="btn">
          Add New Hotel Category
        </Link>
          {/* Categories List */}
          {categories.length > 0 ? (<CategoryTable data={categories} />) : (<TitleHeader text={"You Have No Categories"} />)}
                
        </div>

      </div>
    </DashboardContainer>
  );
}

export default ManageCategory;
