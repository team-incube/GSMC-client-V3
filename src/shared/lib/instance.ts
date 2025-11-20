import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './cookie/cookie';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 클라이언트/서버 사이드 동적 Axios 인스턴스
 */
export const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let accessToken;

    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      accessToken = cookieStore.get('accessToken')?.value || null;
    } else {
      accessToken = getCookie('accessToken');
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
