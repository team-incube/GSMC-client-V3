import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './cookie';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = typeof window !== 'undefined' ? getCookie('accessToken') : undefined;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
