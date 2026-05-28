import axios from "axios";

const API_URL = "https://restaurant-backend-ca51.onrender.com/api/food";

export const getAllFoods = async () => {
  const response = await axios.get(`${API_URL}/all`);
  return response.data;
};

export const addFood = async (food) => {
  const response = await axios.post(`${API_URL}/add`, food);
  return response.data;
};

export const deleteFood = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};

export const updateFood = async (id, food) => {
  const response = await axios.put(`${API_URL}/update/${id}`, food);
  return response.data;
};