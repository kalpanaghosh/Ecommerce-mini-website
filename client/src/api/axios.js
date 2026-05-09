import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce-mini-website-e86h.onrender.com/api"
});

export default api;