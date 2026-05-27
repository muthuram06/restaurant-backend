import axios from "axios";

const API_URL =
    "http://localhost:8080/api/orders";

export const saveOrder = (order) => {
    return axios.post(API_URL, order);
};

export const getAllOrders = () => {
    return axios.get(API_URL);
};

export const getUserOrders = (email) => {
    return axios.get(
        `${API_URL}/user/${email}`
    );
};

export const updateOrderStatus = (
    id,
    status
) => {

    return axios.put(
        `${API_URL}/${id}/${status}`
    );
};