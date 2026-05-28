import axios from "axios";

const API_URL = "https://restaurant-backend-ca51.onrender.com/api/food";

export const getAllFoods = () =>
    axios.get(`${API_URL}/all`);

export const addFood = (food) =>
    axios.post(`${API_URL}/add`, food);

export const deleteFood = (id) =>
    axios.delete(`${API_URL}/delete/${id}`);

export const updateFood = (id, food) =>
    axios.put(`${API_URL}/update/${id}`, food);