import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 서버 사이드 전용 Axios 인스턴스
 */
export const serverInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

serverInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
