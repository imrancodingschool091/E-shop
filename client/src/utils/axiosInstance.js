import axios from "axios";

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const axiosInstance = axios.create({
  baseURL: "https://e-shop-1-hemj.onrender.com/api",
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          "https://e-shop-1-hemj.onrender.com/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        // Clear any stored user data and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('persist:auth'); // If using redux-persist
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;