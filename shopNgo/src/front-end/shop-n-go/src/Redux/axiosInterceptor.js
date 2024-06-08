// src/Redux/axiosInterceptor.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library
import { store } from './store';
import { logout } from './features/userSlice';

// Create an Axios instance
const axiosInstance = axios.create();

// Add a request interceptor to include the JWT token in headers
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor to handle JWT expiration
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    store.dispatch(logout());
                    localStorage.removeItem('jwtToken');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
