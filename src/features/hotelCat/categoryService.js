import axios from "axios";

const API_URL = "/category";

// Create new Category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}`, categoryData, config);
  return response.data;
};
// Get All Categories
const getCategories = async (hotel_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, hotel_id, config);
  return response.data;
};
const categoryService = {
  createCategory,
  getCategories,
};
export default categoryService;
