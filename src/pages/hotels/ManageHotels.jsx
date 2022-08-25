import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardContainer, Spinner } from "../../components";
import { HotelListItem } from "../../components/hotel";
import axios from "axios";

function ManageHotels() {
  const [hotels, setHotels] = useState(null);

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
      if (user?.userRole === "Admin") { 
        axios
        .get(`/hotel/allhotels`)
        .then((res) => {
          setHotels(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        setHotels("Raju")
      }

    return () => {

    };
  }, [user]);

if(!hotels) return <Spinner />;
  return (
    <DashboardContainer>
      <div>
        <h1>Hotels</h1>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          {hotels &&
            hotels.map((item, index) => (
              <HotelListItem key={index} data={item} />
            ))}
        </div>
      </div>
    </DashboardContainer>
  );
}

export default ManageHotels;
