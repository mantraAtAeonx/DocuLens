import axios from "axios";

// Get the base URL from environment variables
const localBaseUrl = import.meta.env.VITE_LOCAL_BASE_URL;
const liveBaseUrl = import.meta.env.VITE_LIVE_BASE_URL;

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: localBaseUrl,
});

// API Interceptors
axios.interceptors.request.use((config) => {
  return config;

  // config.headers.Authorization = `Bearer ${token}`
});

// API connector function
export const apiConnector = async (
  method,
  endpoint,
  data = null,
  headers = {},
  params = {}
) => {
  try {
    const response = await axiosInstance.request({
      method,
      url: endpoint,
      data,
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
