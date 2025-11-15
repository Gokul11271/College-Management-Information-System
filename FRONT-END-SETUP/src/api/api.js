// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080/api", // Spring Boot backend URL
// });

// export default api;
// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10000,
});

// Attach token if available
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("user");
  if (raw) {
    try {
      const user = JSON.parse(raw);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {
      // ignore parse errors
    }
  }
  return config;
});

export default api;
