import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = 'https://fakestoreapi.com';

export const Endpoint = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Increased timeout to 5 seconds for better network handling
});

export const upload = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Request Interceptor (No Store, Assuming Token is Passed Dynamically)
Endpoint.interceptors.request.use(
    async (config) => {
      try {
        // Retrieve the token from AsyncStorage
        const authToken = await AsyncStorage.getItem('authToken');
        
        if (authToken) {
          // Add the Authorization header to the request if the token exists
          config.headers.Authorization = `Bearer ${authToken}`;
        }
  
        // Log the request details for debugging
        console.log("📤 API Request:", config?.url, config?.data);
        return config;
      } catch (error) {
        console.error("Error retrieving token:", error);
        return Promise.reject(error); // Reject the request if there's an error retrieving the token
      }
    },
    (error) => Promise.reject(error)
  );
  

// General Error Handling
export const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Something went wrong";

    if (error.code === "ECONNABORTED") {
      return new Error("Request Timeout !!");
    }

    switch (status) {
      case 401:
        handleSessionExpiration();
        return new Error("Unauthorized access. Please login again.");

      case 406:
        return new Error("Your account has been blocked.");

      case 408:
        return new Error("Session expired. Please login again.");

      default:
        return new Error(message);
    }
  }
  return new Error(error.toString());
};

// Logout or Expire Session Handler
const handleSessionExpiration = () => {
  console.log("🚨 Session expired! Logging out...");
  // Add logic to clear storage or navigate to login screen if needed
};

// Utility to Catch Errors
export const catchHandling = (params) => {
  if (axios.isAxiosError(params)) {
    return {
      status: params.response?.data?.success || false,
      message: params.response?.data?.message || "An error occurred",
      response: params.response,
    };
  } else {
    return { status: false, message: params };
  }
};










