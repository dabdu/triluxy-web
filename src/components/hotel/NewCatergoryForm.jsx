import axios from "axios";
import { useState } from "react";
import { FaPlusSquare, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../";
function NewCatergoryForm({hotelId, config}) {
  const [isLoading, setIsLoading] = useState(false)
  const [val, setVal] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: "",
    price: 0,
    maxPersons: 2,
    features:[],
    description: "",
  });
const navigate = useNavigate()
  const { categoryName, price, maxPersons, features, description } = formData;
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
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (
      !categoryName ||
      !price ||
      !features ||
      val === []
    ) {
      setIsLoading(false);
      toast.error("All Field Must be Filled");
      return;
    }

    const categoryData = {
      hotel: hotelId,
      categoryName,
      price,
      maxPersons,
      features: val,
      description,
    };
    axios
      .post(`/category`, categoryData, config)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        if (res.status == 201) {
          setFormData((prevState) => ({
            ...prevState,
            categoryName: "",
            price: 0,
            maxPersons: 2,
            description: "",
          }));
          setVal([]);
          navigate(`/hotel/${hotelId}`);
          toast.success("Catergory Added Successfully");
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
    <div
      style={{ width: 600 }}
      className="bg-slate-50 px-3 py-5 shadow-xl rounded-md mx-auto my-5"
    >
      {/* Form  */}
      <div className="">
        <form>
          <div className="form-group">
            <label className="control-label">Category Name</label>

            <input
              type="text"
              className="form-control"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              placeholder="Enter Category Name"
              onChange={onChange}
            />
          </div>
          <div className="">
            <div className="form-group">
              <label className="control-label">Price Per Night</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={price}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label className="control-label">Max Persons</label>
              <input
                type="number"
                className="form-control"
                id="maxPersons"
                name="maxPersons"
                value={maxPersons}
                onChange={onChange}
              />
            </div>
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
            <label className="control-label">Description</label>
            <textarea
              value={description}
              name="description"
              id="description"
              onChange={onChange}
              placeholder={"About this Category"}
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
  );
}

export default NewCatergoryForm;
