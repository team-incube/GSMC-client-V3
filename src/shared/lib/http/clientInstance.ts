import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from '../cookie/cookie';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 클라이언트 사이드 전용 Axios 인스턴스
 */
export const clientInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

clientInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
