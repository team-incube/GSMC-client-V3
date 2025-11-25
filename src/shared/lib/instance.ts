import axios from 'axios';

export const baseURL = '/api/proxy';

export const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();

      const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');

      if (cookieHeader) {
        config.headers.Cookie = cookieHeader;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
