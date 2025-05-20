import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {errorCodes} from './errorCodes';
import {
  SignUpCredentials,
  VerifyCredentials,
  LoginCredentials,
  reVerificationCredentials,
  fetchProfileCredentials,
  updateProfileCredentials,
  RefreshCredentials,
  fetchProductsCredentials,
  searchProductsCredentials,
} from './interfaceTypes';

const {FLARE, UNAUTHORIZED, NOT_FOUND, NOT_VERIFIED, EXISTS} = errorCodes;
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

    if (error?.response?.status === FLARE) {
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (originalRequest._retryCount < MAX_RETRIES) {
        originalRequest._retryCount += 1;

        console.log(
          `Retrying request due to FLARE error. Attempt ${originalRequest._retryCount}`,
        );
        await new Promise(resolve => setTimeout(resolve, 1000));
        return axiosInstance(originalRequest);
      } else {
        console.error('Max retry attempts reached for FLARE error.');
      }
    }
    if (error?.response?.status === UNAUTHORIZED) {
      // trigger token refresh
    }
    return Promise.reject(error);
  },
);

const handleError = (
  error: AxiosError,
  fallbackMessage = 'Something went wrong',
  customMessages: Record<number, string> = {},
) => {
  const status = error.response?.status;
  const message = customMessages[status!] || fallbackMessage;
  console.error('API Error:', error.response?.data || error);
  return {
    success: false,
    code: status,
    message,
  };
};

const login = async (credentials: LoginCredentials) => {
  try {
    const {data} = await axiosInstance.post('/api/auth/login', credentials);
    return data;
  } catch (error: any) {
    return handleError(error, 'Login failed', {
      [UNAUTHORIZED]: 'Email or password incorrect',
      [NOT_VERIFIED]: 'You must verify your account first',
      [NOT_FOUND]: 'User not found',
      [FLARE]: 'Server error',
    });
  }
};

const refreshToken = async (credentials: RefreshCredentials) => {
  try {
    const {data} = await axiosInstance.post('/auth/refresh-token', credentials);
    return data;
  } catch (error: any) {
    return handleError(error, 'Token refresh failed', {
      [FLARE]: 'Server error',
      [UNAUTHORIZED]: 'Invalid refresh token',
    });
  }
};

const signup = async (credentials: SignUpCredentials) => {
  try {
    const {data} = await axiosInstance.post('/api/auth/signup', credentials);
    return data;
  } catch (error: any) {
    return handleError(error, 'Signup failed', {
      [EXISTS]: 'User already exists',
      [FLARE]: 'Server error',
    });
  }
};

const verification = async (credentials: VerifyCredentials) => {
  try {
    const {data} = await axiosInstance.post(
      '/api/auth/verify-otp',
      credentials,
    );
    return data;
  } catch (error: any) {
    return handleError(error, 'Verification failed', {
      400: 'Invalid or expired OTP',
      [FLARE]: 'Server error',
    });
  }
};

const reVerification = async (credentials: reVerificationCredentials) => {
  try {
    const {data} = await axiosInstance.post(
      '/api/auth/resend-verification-otp',
      credentials,
    );
    return data;
  } catch (error: any) {
    return handleError(error, 'Verification failed', {
      [FLARE]: 'Server error',
    });
  }
};

const fetchProfile = async ({token}: fetchProfileCredentials) => {
  try {
    const {data} = await axiosInstance.get('/api/user/profile', {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error: any) {
    return handleError(error, 'Fetch profile failed', {
      [FLARE]: 'Server error',
    });
  }
};

const getMimeType = (uri: string): string => {
  const extension = uri.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
};

const updateProfile = async (credentials: updateProfileCredentials) => {
  try {
    const {token, firstName, lastName, image} = credentials;

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    if (image) {
      const mimeType = getMimeType(image);
      const filename = image.split('/').pop() || 'profile-image';
      formData.append('profileImage', {
        uri: image,
        name: filename,
        type: mimeType,
      } as any);
    }
    const {data} = await axiosInstance.put('/api/user/profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error: any) {
    return handleError(error, 'Update profile failed', {
      [FLARE]: 'Server error',
    });
  }
};

const fetchProducts = async (credentials: fetchProductsCredentials) => {
  try {
    const {token, ...queryParams} = credentials;
    const {data} = await axiosInstance.get('/api/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: queryParams.page ?? 1,
        limit: queryParams.limit ?? 10,
        minPrice: queryParams.minPrice,
        maxPrice: queryParams.maxPrice,
        sortBy: queryParams.sortBy,
        order: queryParams.order ?? 'desc',
      },
    });
    console.log('Query Params:', {
      ...queryParams,
      token,
    });
    return data;
  } catch (error: any) {
    return handleError(error, 'Products fetching failed', {
      [FLARE]: 'Server error',
    });
  }
};

const searchProducts = async (credentials: searchProductsCredentials) => {
  try {
    const {data} = await axiosInstance.get('/api/products/search', {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
      params: {
        query: credentials.query,
      },
    });
    return data;
  } catch (error: any) {
    return handleError(error, 'Products search failed', {
      [FLARE]: 'Server error',
    });
  }
};

export {
  axiosInstance,
  login,
  signup,
  verification,
  reVerification,
  fetchProfile,
  updateProfile,
  refreshToken,
  fetchProducts,
  searchProducts,
};
