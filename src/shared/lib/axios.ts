import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { PUBLIC_PAGE } from '../config/protect-page';
import { cookies } from 'next/headers';

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
