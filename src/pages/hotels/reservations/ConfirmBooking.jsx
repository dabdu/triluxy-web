import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../../../components";
import emailjs from "emailjs-com";

const ConfirmBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [assignedRoom, setAssignedRoom] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { userId, reserveId } = location?.state;

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  //   Get Rooms in this Category
  useEffect(() => {
    axios
      .get(`/category/available-rooms/${params?.id}`, config)
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        toast.error(
          "Error, While Fetching Hotel Rooms, Please Refresh the Page"
        );
        console.log(err);
      });

    return () => {
      setRooms([]);
    };
  }, [params?.id]);
  //   Get the Reservation's USer Info
  useEffect(() => {
    if (userId) {
      axios
        .get(`/user/user/${userId}`, config)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          toast.error(
            "Error, While Fetching User's Data, Please Refresh the Page"
          );
          console.log(err);
        });

      return () => {
        setUserInfo({});
      };
    }
  }, [userId]);
  let message = `Hello, You Hotel Booking was Approved and Confirmed, You have been Assign Room. Attached is your Booking Reciept Feel Free to Reach Out to Us for more Info.`;
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!assignedRoom) {
      toast.error("Please Select Any Available Room");
    }
    const reserveData = {
      reserveId,
      assignedRoomId: assignedRoom,
    };
    console.log(reserveData);
    await axios
      .post(`/hotel/bookings/confirmed`, reserveData, config)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        if (res.status == 201) {
          navigate(`/bookings/confirmed`);
          toast.success(
            "Booking Confirmed & Room Assigned to Customer Successfully"
          );
        }
      })
      .then(() => {
        emailjs
          .sendForm(
            "service_v03ai27",
            "template_x6tn4cv",
            e.target,
            "6OcYdXmwEOVIgG8QA"
          )
          .then(
            () => {
              toast.success("Confirmation Mail Sent Successfully");
            },
            (error) => {
              console.log(error);
              toast.error(
                "But confirmation not sent, Please send notify user."
              );
            }
          );
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Error Occured, Please Try Again");
        console.log(error);
      });
  };
  if (!rooms || isLoading || !userInfo) return <Spinner />;
  console.log(rooms);
  console.log(userInfo);
  console.log(reserveId);
  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className=" flex flex-col items-center justify-center bg-slate-100"
    >
      <div style={{ position: "fixed", top: 10, right: 20 }}>
        <Link to={`/hotel/${params?.id}/add-room`} className="btn text-white">
          Add Room to This Category
        </Link>
      </div>
      <div className="shadow-2xl rounded-lg p-10 bg-white">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="control-label text-lg font-bold text-orange-600">
              Assign Room to User's Reservation
            </label>
            <select
              onChange={(e) => setAssignedRoom(e.target.value)}
              name="assignedRoom"
              id="assignedRoom"
              className="form-control"
            >
              <option value={""}>-- Available Rooms--</option>
              {rooms.length > 0 &&
                rooms.map((e, index) => (
                  <option key={index} value={e._id} className="my-2">
                    {e.roomName}
                  </option>
                ))}
            </select>
            {/* Hidden Messages */}
            <input type={"hidden"} value={message} name="message" />
            <input type={"hidden"} value={userInfo?.name} name="to_name" />
            <input type={"hidden"} value={userInfo?.email} name="to_email" />
          </div>
          <div className="form-group">
            <button
              className="btn btn-block bg-secondary text-white"
              //   onClick={onSubmit}
            >
              Check Out User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmBooking;
