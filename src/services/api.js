import axios from 'axios';

const API = axios.create({
    baseURL: 'https://travel-agency-booking-system-backend.onrender.com', // Update with your backend's URL
});

// Interceptor for logging errors (optional)
API.interceptors.response.use(
    response => response,
    error => {
        console.error(error.response || error.message);
        return Promise.reject(error);
    }
);

export default API;
