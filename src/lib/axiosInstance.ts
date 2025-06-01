import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {errorCodes} from './errorCodes';
import {ToastAndroid} from 'react-native';

const {FLARE, UNAUTHORIZED} = errorCodes;
const API_URL = Config.API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
const MAX_RETRIES = 3;
axiosInstance.interceptors.request.use(config => {
  if (config.auth) {
    config.headers.Authorization = `Bearer ${config.headers.Authorization}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const status = error?.response?.status;
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
