import axios from "axios";

const API_URL = "/hotel";

// Create new Goal
const createHotel = async (hotelData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}`, hotelData, config);
  return response.data;
};
// Create new Hotel
const getHotel = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
const hotelService = {
  createHotel,
  getHotel,
};
export default hotelService;
