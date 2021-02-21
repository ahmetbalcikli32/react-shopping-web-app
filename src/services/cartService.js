import axios from "axios";

const API_URL = '/api/cartDetails';

export const saveCart = cart => {
    return axios.post(API_URL, cart);
}