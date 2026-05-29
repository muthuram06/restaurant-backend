import axios from "axios";

const API_URL =
  "https://restaurant-backend-ca51.onrender.com/api/food";

const getAllFoods = () => {
  return axios.get(`${API_URL}/all`);
};

export default {
  getAllFoods
};