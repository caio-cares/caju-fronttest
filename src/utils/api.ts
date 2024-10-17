import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    throw err;
  }
);
