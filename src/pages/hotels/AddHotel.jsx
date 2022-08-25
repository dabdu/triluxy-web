import { useState, useEffect } from "react";
import { DashboardContainer, Spinner } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { lgaList } from "../../constants/localgvt";
import { FaTimesCircle, FaPlusSquare, FaHotel } from "react-icons/fa";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function AddHotel() {
  const [isLoading, setIsLoading] = useState(false);

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

  const { user } = useSelector((state) => state.auth);
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
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
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
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !hotelName ||
      !address ||
      !state ||
      !description ||
      !localgvt ||
      !facilites ||
      !terms ||
      val === []
    ) {
      setIsLoading(false);
      toast.error("All Field Must be Filled");
      return;
    }
    if (images.length < 4) {
      setIsLoading(false);
      toast.error("Upload atleast 4 images of your Hotel");
      return;
    }

    // store Hotel Image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, "triluxy/hotel/images/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            toast.success("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                // toast.success("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                // toast.success("Image Image in Progress");
                break;
              default:
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
            toast.error("Something went Wrong, while uploading the Images");
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };
    const imageUrl = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((err) => {
      setIsLoading(false);
      toast.error("Images not uploaded, Try Again");
      console.log(err);
      return;
    });
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const hotelData = {
      hotelName,
      fImg: imageUrl[0],
      images: imageUrl,
      address,
      state,
      town: localgvt,
      description,
      facilities: val,
      terms,
      lat,
      lng,
    };
    axios
      .post(`/hotel/admin/add-hotel`, hotelData, config)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        if (res.status == 201) {
          navigate("/manage-hotels");
          toast.success("Hotel Added Successfully");
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
      <div
        style={{
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="custom-container py-10"
      >
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
        <section
          className="form"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
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
                <option value={""}>-- Choose City --</option>
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
              <label className="control-label">Images</label>
              <p className="imagesInfo">
                The first image will be the cover (atleast 4 Images).
              </p>
              <input
                className="formInputFile"
                type="file"
                id="images"
                onChange={onChange}
                min="3"
                accept=".jpg,.png,.jpeg"
                multiple
                required
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
    </DashboardContainer>
  );
}

export default AddHotel;
