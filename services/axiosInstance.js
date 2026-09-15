// services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080/api', // dùng 10.0.2.2 nếu bạn test Android emulator
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
