import axios from "axios";
import { API_BASE_URL } from "../constants/apiPaths";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL, //http://localhost:5000
});

export default axiosInstance;
