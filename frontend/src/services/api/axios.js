import axios from "axios";
import { useAuthStore } from "@store/authStore";

const clienteApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  headers: { Accept: "application/json" }
});

clienteApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

clienteApi.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default clienteApi;
