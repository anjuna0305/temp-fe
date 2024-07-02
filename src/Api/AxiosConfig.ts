import axios from 'axios';
import { getStoredToken, removeStoredToken } from '../Auth/Auth';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
    config => {
        const token = getStoredToken()
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            handleTokenExpiration();
        }
        return Promise.reject(error);
    }
);

// handle token expiration
const handleTokenExpiration = (): void => {
    console.log('Token expired. Redirecting to login...')
    removeStoredToken()
    // window.location.href = '/login'
};

export default axiosInstance
