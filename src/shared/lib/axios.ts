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
        // Route Handler API를 호출하여 토큰 갱신 시도
        await axios.post('http://localhost:3000/api/auth/refresh',{},{withCredentials: true});
        
        // 토큰 갱신이 성공하면 원래 요청을 다시 시도
        return instance(originalRequest);

      } catch (error) {
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
        if(typeof window !== 'undefined') {
          window.location.href = PUBLIC_PAGE;
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
