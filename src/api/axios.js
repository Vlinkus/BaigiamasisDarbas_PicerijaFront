import axios from "axios";
import { BACKEND } from "../components/GlobalVariables";
const BASE_URL = BACKEND;

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Contend-Type": "application/json" },
  withCredentials: true
});
