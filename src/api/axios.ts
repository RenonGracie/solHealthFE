import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
