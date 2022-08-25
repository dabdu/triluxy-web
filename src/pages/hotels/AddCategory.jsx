import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardContainer, Spinner, TitleHeader } from "../../components";
import { useParams } from "react-router-dom";
import { NewCatergoryForm } from "../../components/hotel";

function AddCategory() {
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return (
    <DashboardContainer>
      <div  style={{width: "100%"}} className="my-16">
      <div >
        <TitleHeader text={"Add New Category"} />
      </div>
      <NewCatergoryForm hotelId={params?.id} config={config}/>
      </div>
    </DashboardContainer>
  );
}

export default AddCategory;
