import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-url.com",
});

export default api;