import axios from "axios";

function isExpired(token) {
  try {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp < Math.floor(Date.now() / 1000);
  } catch {
    return true;
  }
}

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

let refreshPromise = null;

api.interceptors.request.use(async (config) => {
  let access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (access && isExpired(access) && refresh) {
    try {
      if (!refreshPromise) {
        refreshPromise = axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh,
        });
      }

      const res = await refreshPromise;
      access = res.data.access;
      localStorage.setItem("access", access);
    } catch (error) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
      return Promise.reject(error);
    } finally {
      refreshPromise = null;
    }
  }

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});

export default api;