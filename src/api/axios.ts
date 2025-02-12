import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    (import.meta.env.VITE_API_URL as string) ||
    `${window.location.protocol}//api.${window.location.hostname}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
