import axios from "axios";
import {
  ADMIN_TOKEN_KEY,
  ADMIN_SESSION_CLEARED_EVENT,
} from "@/src/lib/adminAuth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
  },
  withCredentials: true,
  // Fail fast during SSG/dev when the API is down or a placeholder host hangs
  timeout: 8_000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      try {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        window.dispatchEvent(new CustomEvent(ADMIN_SESSION_CLEARED_EVENT));
      } catch {
        /* ignore */
      }
    }
    return Promise.reject(error);
  },
);

export default api;
