import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.mohamed-sadek.com",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export const AUTHENTICATION_URLS = {
  regitser: `/User/POST	`,
  login: `User/Login`,
};
