import axios from "axios";

// this is the axios instance for api calls in all services and the property of withCredentials is true to send the cookies to the server
const axiosInstance = axios.create({
  baseURL: "https://leetcode-backend-main.onrender.com",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default axiosInstance;
