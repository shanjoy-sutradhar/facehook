import axios from "axios";
// "http://localhost:3000"
export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});
