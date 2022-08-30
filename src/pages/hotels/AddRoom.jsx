import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DashboardContainer, Spinner, TitleHeader } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AddRoom() {
  const [isLoading, setIsLoading] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [category, setCategory] = useState({});
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(`/category/${params?.id}`, config)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        toast.error(
          "Error, While Fetching Category Data, Please Refresh the Page"
        );
        console.log(err);
      });

    return () => {
      setCategory([]);
    };
  }, [params?.id]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (roomName === "") {
      setIsLoading(false);
      toast.error("All Field Must be Filled");
      return;
    }
    const roomData = {
      hotelId: category?.hotel,
      categoryId: params?.id,
      categoryName: category?.categoryName,
      roomName,
      status: "Available",
    };
    console.log(roomData);
    axios
      .post(`/category/add-room`, roomData, config)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        if (res.status == 201) {
          // navigate(`/hotel/category/${params?.id}`);
          navigate(-1);
          toast.success("Room Added Successfully");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Error Occured, Please Try Again");
        console.log(error);
      });
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <DashboardContainer>
      <div style={{ width: "100%" }} className="my-16">
        <div>
          <TitleHeader text={"Add New Room"} />
        </div>
        <div
          style={{ width: 600 }}
          className="bg-slate-50 px-3 py-5 shadow-xl rounded-md mx-auto my-5"
        >
          {/* Form  */}
          <div className="">
            <form>
              <div className="form-group">
                <label className="control-label">Room Name</label>

                <input
                  type="text"
                  className="form-control"
                  id="roomName"
                  name="roomName"
                  value={roomName}
                  placeholder="Enter Room Name"
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-block bg-secondary text-white"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default AddRoom;
