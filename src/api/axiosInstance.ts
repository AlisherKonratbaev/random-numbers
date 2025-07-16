import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://numbersapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;