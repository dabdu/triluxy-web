import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components";
import { createHotel, reset } from "../../features/hotel/hotelSlice";
import { toast } from "react-toastify";
import { lgaList } from "../../constants/localgvt";
import { FaTimesCircle, FaPlusSquare, FaHotel } from "react-icons/fa";
import { logout, reset as logoutReset } from "../../features/auth/authSlice";

function SetupHotel() {
  const [formData, setFormData] = useState({
    hotelName: "",
    fImg: "",
    images: [],
    address: "",
    state: "",
    localgvt: "",
    description: "",
    facilites: [],
    terms: "",
    lat: "",
    lng: "",
  });
  const [localgvtForm, setLocalgvtForm] = useState(false);
  const [local, setLocal] = useState(null);
  const [val, setVal] = useState([]);

  const {
    hotelName,
    fImg,
    images,
    address,
    state,
    localgvt,
    description,
    facilites,
    terms,
    lat,
    lng,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.hotels
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      console.log(message);
    }
    if (isSuccess) {
      dispatch(logout());
      dispatch(logoutReset());
      navigate("/login");
      toast.success("Hotel Details Added Successfully, Please Login ");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);
  useEffect(() => {
    const Func = async () => {
      const filteredLga = await lgaList.filter((item) => item.state === state);
      await setLocal(filteredLga[0]);
      await setLocalgvtForm(true);
    };
    Func();
  }, [state]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAdd = () => {
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
  };
  const handleDelete = (i) => {
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!hotelName || !address) {
      toast.error("All Field Must be Filled");
    } else {
      const hotelData = {
        hotelName,
        fImg: "https://stockphoto.com/samples/NTA2NDM1MzMwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/swimming-pool-and-building-of-the-luxury-hotel-halkidiki-greec.jpg&size=1024",
        images: [
          "https://stockphoto.com/samples/NTUzNDk1NTUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/modern-hotel-room-interior.jpg&size=1024",
          "https://stockphoto.com/samples/MTE3NzQ0MDUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/bright-hotel-room-interior.jpg&size=1024",
        ],
        address,
        state,
        town: localgvt,
        description,
        facilities: val,
        terms,
        lat,
        lng,
      };
      console.log(hotelData);
      dispatch(createHotel(hotelData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  if (!user) {
    return <Spinner />;
  }
  if (user.userStatus === "activeHotelAdmin") return <SetupHotel />;
  return (
    <div className="custom-container py-16">
      <div className="items-center justify-center content-center">
        <div>
          <FaHotel
            style={{ marginLeft: "auto", marginRight: "auto", fontSize: 100 }}
            className="text-secondary"
          />
        </div>

        <h1 className="text-2 xl font-semibold text-secondary mt-2 mb-5">
          Add Hotel your Details
        </h1>
      </div>
      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="hotelName"
              name="hotelName"
              value={hotelName}
              placeholder="Enter your Hotel Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              placeholder="Enter your Address"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="control-label">State</label>
            <select
              onChange={onChange}
              name="state"
              id="state"
              className="form-control"
            >
              <option value="">- Select -</option>
              <option value="Abia">Abia</option>
              <option value="Adamawa">Adamawa</option>
              <option value="AkwaIbom">AkwaIbom</option>
              <option value="Anambra">Anambra</option>
              <option value="Bauchi">Bauchi</option>
              <option value="Bayelsa">Bayelsa</option>
              <option value="Benue">Benue</option>
              <option value="Borno">Borno</option>
              <option value="Cross River">Cross River</option>
              <option value="Delta">Delta</option>
              <option value="Ebonyi">Ebonyi</option>
              <option value="Edo">Edo</option>
              <option value="Ekiti">Ekiti</option>
              <option value="Enugu">Enugu</option>
              <option value="FCT">FCT</option>
              <option value="Gombe">Gombe</option>
              <option value="Imo">Imo</option>
              <option value="Jigawa">Jigawa</option>
              <option value="Kaduna">Kaduna</option>
              <option value="Kano">Kano</option>
              <option value="Katsina">Katsina</option>
              <option value="Kebbi">Kebbi</option>
              <option value="Kogi">Kogi</option>
              <option value="Kwara">Kwara</option>
              <option value="Lagos">Lagos</option>
              <option value="Nasarawa">Nasarawa</option>
              <option value="Niger">Niger</option>
              <option value="Ogun">Ogun</option>
              <option value="Ondo">Ondo</option>
              <option value="Osun">Osun</option>
              <option value="Oyo">Oyo</option>
              <option value="Plateau">Plateau</option>
              <option value="Rivers">Rivers</option>
              <option value="Sokoto">Sokoto</option>
              <option value="Taraba">Taraba</option>
              <option value="Yobe">Yobe</option>
              <option value="Zamfara">Zamafara</option>
            </select>
          </div>
          <div className="form-group">
            <label className="control-label">City</label>
            <select
              onChange={onChange}
              name="localgvt"
              id="localgvt"
              className="form-control"
            >
              {localgvtForm &&
                local?.areas?.map((e, index) => (
                  <option key={index} value={e}>
                    {e}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label className="control-label">Description</label>
            <textarea
              value={description}
              name="description"
              id="description"
              onChange={onChange}
              rows={4}
              placeholder={"About Hotel"}
            />
          </div>
          <div className="form-group">
            <div
              style={{ width: "100%" }}
              className="flex items-center justify-between py-5 px-3"
            >
              <label className="control-label">Facilities</label>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                className=" justify-center items-center"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAdd();
                  }}
                  className="bg-secondary h-8 w-8 flex items-center justify-center rounded-l "
                >
                  <FaPlusSquare color="white" />
                </button>
                <p className="text-xs text-veryDarkBlue font-semibold">
                  Click here to Add
                </p>
              </div>
            </div>

            {val.map((data, i) => {
              return (
                <div key={i} className="flex items-center justify-center">
                  <input
                    value={data}
                    className={"form-control mr-5"}
                    onChange={(e) => handleChange(e, i)}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(i);
                    }}
                    className="my-5"
                  >
                    <FaTimesCircle className="text-red-500 text-2xl" />
                  </button>
                </div>
              );
            })}
          </div>
          <div className="form-group">
            <label className="control-label">
              Hotel's Terms and Conditions
            </label>
            <textarea
              value={terms}
              name="terms"
              id="terms"
              onChange={onChange}
              rows={4}
              placeholder={"Terms and Conditions"}
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
      </section>
    </div>
  );
}

export default SetupHotel;
