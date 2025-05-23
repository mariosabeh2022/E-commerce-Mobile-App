import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {errorCodes} from './errorCodes';
import {
  SignUpCredentials,
  VerifyCredentials,
  LoginCredentials,
  reVerificationCredentials,
  fetchProfileCredentials,
  RefreshCredentials,
  fetchProductsCredentials,
  searchProductsCredentials,
  productDetailCredentials,
  createProductCredentials,
  deleteProductCredentials,
  editProductCredentials,
  resetPasswordCredentials,
} from './interfaceTypes';
import {ToastAndroid} from 'react-native';

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
        await new Promise(resolve => setTimeout(resolve, 1000));
        return axiosInstance(originalRequest);
      } else {
        ToastAndroid.show('Server Error', ToastAndroid.SHORT);
      }
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
  ToastAndroid.show('Server Error', ToastAndroid.SHORT);
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

const resetPassword = async (credentials: resetPasswordCredentials) => {
  try {
    const {data} = await axiosInstance.post(
      '/api/auth/forgot-password',
      credentials,
    );
    return data;
  } catch (error: any) {
    return handleError(error, 'Reset password failed', {
      [NOT_VERIFIED]: 'You must verify your account first',
      [NOT_FOUND]: 'User not found',
      [FLARE]: 'Server error',
    });
  }
};

const refreshTokenFn = async (credentials: RefreshCredentials) => {
  try {
    const {data} = await axiosInstance.post(
      '/api/auth/refresh-token',
      credentials,
    );
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

const updateProfile = async ({
  token,
  formData,
}: {
  token: string;
  formData: FormData;
}) => {
  try {
    const {data} = await axiosInstance.put('/api/user/profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return {success: true, data};
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Updated Username',
    };
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
    return data;
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To Load Products',
    };
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
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To Filter Products',
    };
  }
};

const productDetails = async (credentials: productDetailCredentials) => {
  try {
    const {data} = await axiosInstance.get(`/api/products/${credentials.id}`, {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    return data;
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To Fetch Details',
    };
  }
};

const createProduct = async (credentials: createProductCredentials) => {
  const {token, title, description, price, location, images} = credentials;

  try {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('location', JSON.stringify(location));

    if (images.length === 0) {
      throw new Error('No images provided');
    }

    images.forEach((image, index) => {
      if (image.uri) {
        const uriParts = image.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('images', {
          uri: image.uri,
          name: `photo_${index}.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }
    });

    const {data} = await axiosInstance.post('/api/products', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Server Error, Try Again',
    };
  }
};

const editProduct = async (credentials: editProductCredentials) => {
  const {token, title, description, price, location, images} = credentials;

  try {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('location', JSON.stringify(location));

    if (images.length === 0) {
      throw new Error('No images provided');
    }

    images.forEach((image, index) => {
      if (image.uri) {
        const uriParts = image.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('images', {
          uri: image.uri,
          name: `photo_${index}.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }
    });

    const {data} = await axiosInstance.put(
      `/api/products/${credentials.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return data;
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To Edit, Try Again',
    };
  }
};

const deleteProduct = async (credentials: deleteProductCredentials) => {
  try {
    const {data} = await axiosInstance.delete(
      `/api/products/${credentials.id}`,
      {
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      },
    );
    return data;
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To delete',
    };
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
  refreshTokenFn,
  fetchProducts,
  searchProducts,
  productDetails,
  createProduct,
  deleteProduct,
  editProduct,
  resetPassword,
};
