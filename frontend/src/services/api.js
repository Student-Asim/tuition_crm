// src/api.js
import axios from "axios";

function isExpired(token) {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.exp < Math.floor(Date.now() / 1000);
}

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(async (config) => {
  let access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (access && isExpired(access) && refresh) {
    const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
      refresh,
    });
    access = res.data.access;
    localStorage.setItem("access", access);
  }

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});

export default api;