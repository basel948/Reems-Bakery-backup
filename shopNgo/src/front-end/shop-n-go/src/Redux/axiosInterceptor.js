// src/Redux/axiosInterceptor.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct the import statement
import { store } from './store';
import { logout } from './features/userSlice';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Create an Axios instance
const axiosInstance = axios.create();

// Function to handle logout
const handleLogout = () => {
    store.dispatch(logout());
    localStorage.removeItem('jwtToken');
    window.location.href = '/'; // Redirect to homepage
};

// Function to show the SweetAlert2 alert
const showAlertAndLogout = () => {
    Swal.fire({
        title: 'Error!',
        text: 'Session expired. Please login again',
        icon: 'error',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            handleLogout();
        }
    });
};

// Function to check if the token is expired
const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
};

// Periodically check the token expiration
const checkTokenExpiration = () => {
    const token = localStorage.getItem('jwtToken');
    if (token && isTokenExpired(token)) {
        showAlertAndLogout();
    }
};

// Call the checkTokenExpiration function every minute
setInterval(checkTokenExpiration, 60000);

// Add a request interceptor to include the JWT token in headers
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            if (isTokenExpired(token)) {
                showAlertAndLogout();
                return Promise.reject(new Error('Token expired'));
            }
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
            if (token && isTokenExpired(token)) {
                showAlertAndLogout();
                return Promise.reject(new Error('Token expired'));
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
