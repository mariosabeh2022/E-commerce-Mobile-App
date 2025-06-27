import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {errorCodes} from './errorCodes';
import {ToastAndroid} from 'react-native';
import {refreshTokenFn} from '../api/refreshToken/refreshTokenCall';
import {authStore} from '../stores/authStore/authStore';
const {FLARE, UNAUTHORIZED} = errorCodes;
const API_URL = Config.API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
const MAX_RETRIES = 3;
axiosInstance.interceptors.request.use(config => {
  const accessToken = authStore.getState().accessToken;
  if (config.auth) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const status = error?.response?.status;
    const refreshToken = authStore.getState().refreshToken;
    const setTokens = authStore.getState().setTokens;
    const clearTokens = authStore.getState().clearToken;
    if (status === UNAUTHORIZED && !originalRequest._retry && refreshToken) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: AxiosError) => reject(err),
          });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const response = await refreshTokenFn({refreshToken: refreshToken});
        const {accessToken} = response.data;
        setTokens(accessToken, refreshToken);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err as AxiosError, null);
        clearTokens();
        ToastAndroid.show(
          'Session expired. Please log in again.',
          ToastAndroid.SHORT,
        );
        isRefreshing = false;
        return Promise.reject(err);
      }
    }
    if (status === UNAUTHORIZED) {
      ToastAndroid.show('Incorrect Credentials', ToastAndroid.SHORT);
    }
    if (error?.response?.status === FLARE) {
      originalRequest._retryCount = originalRequest._retryCount || 0;
      if (originalRequest._retryCount < MAX_RETRIES) {
        originalRequest._retryCount += 1;
        await new Promise(resolve => setTimeout(resolve, 1000));
        return axiosInstance(originalRequest);
      } else {
        ToastAndroid.show('Server Timed Out', ToastAndroid.SHORT);
      }
    }
    return Promise.reject(error);
  },
);

export const handleError = (
  error: AxiosError,
  fallbackMessage = 'Something went wrong',
  customMessages: Record<number, string> = {},
) => {
  const status = error.response?.status;
  const message = customMessages[status!] || fallbackMessage;
  ToastAndroid.show('Server Error', ToastAndroid.SHORT);
  return {
    success: false,
    code: status,
    message,
  };
};
export {axiosInstance};
