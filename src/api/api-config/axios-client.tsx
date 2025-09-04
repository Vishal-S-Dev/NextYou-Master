import { Env } from '@env';
import axios from 'axios';

import { type TokenType, updateToken, useAuth } from '@/store/auth';

import { type ApiResponse } from './types';

export const ImagePath = (imageUri: string) => `${Env.BASE_URL}${imageUri}`;

export const axiosClient = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosInstance = axios.create({
  baseURL: Env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useAuth.getState().token?.access;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = useAuth.getState().token?.refresh;
      if (!refreshToken) return Promise.reject(error);

      try {
        const res = await axiosClient.post<ApiResponse<TokenType>>(
          `/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const token = res.data.results;
        updateToken(token);

        originalRequest.headers.Authorization = `Bearer ${token.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// export default axiosInstance;
