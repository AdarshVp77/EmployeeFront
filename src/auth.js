import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("userToken");
    if (accessToken) {
      config.headers.token = accessToken;
    } else {
      delete config.headers.token; // Ensure token is removed if absent
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (username, password) => {
  return axiosInstance.post("/login", { username, password })
    .then((response) => {
      if (response.data.token) {
        sessionStorage.setItem("userToken", response.data.token);
        return true; 
      } else {
        return false; 
      }
    })
    .catch((error) => {
      console.error("Error occurred during login:", error);
      return false; 
    });
};

export const logout = () => {
  sessionStorage.removeItem("userToken");
};