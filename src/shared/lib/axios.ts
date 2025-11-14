import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { PUBLIC_PAGE } from '../config/protect-page';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post('http://localhost:3000/api/auth/refresh',{},{withCredentials: true});
        
        return instance(originalRequest);

      } catch (error) {
        
        if(typeof window !== 'undefined') {
          window.location.href = PUBLIC_PAGE;
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
