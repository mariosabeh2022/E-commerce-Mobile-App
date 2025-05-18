import axios, {AxiosError} from 'axios';
import {errorCodes} from './errorCodes';
import {
  SignUpCredentials,
  VerifyCredentials,
  LoginCredentials,
  reVerificationCredentials,
  fetchProfileCredentials,
} from './interfaceTypes.ts';
const {FLARE, UNAUTHORIZED, NOT_FOUND, NOT_VERIFIED, EXISTS} = errorCodes;

const axiosInstance = axios.create({
  baseURL: 'https://backend-practice.eurisko.me',
  timeout: 10000,
});

axiosInstance?.interceptors.request?.use(config => {
  if (config.auth) {
    config.headers.Authorization = `Bearer ${config.headers.Authorization}`;
  }
  return config;
});

const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === UNAUTHORIZED) {
      return {
        success: false,
        code: UNAUTHORIZED,
        message: 'Email Or Password Incorrect.',
      };
    } else if (error.response && error.response.status === NOT_VERIFIED) {
      return {
        success: false,
        code: EXISTS,
        message: 'You Must Verify Your Account First',
      };
    } else if (error.response && error.response.status === NOT_FOUND) {
      return {
        success: false,
        code: NOT_FOUND,
        message: 'User Not Found',
      };
    } else if (error.response && error.response.status === FLARE) {
      return {
        success: false,
        code: FLARE,
        message: 'Server Error',
      };
    }
    console.error('Login API error:', error);
    return {
      success: false,
      message: error || 'Login failed',
    };
  }
};

const signup = async (credentials: SignUpCredentials) => {
  try {
    const response = await axiosInstance.post('/api/auth/signup', credentials);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === EXISTS) {
      return {
        success: false,
        code: 400,
        message: 'User Already Exists',
      };
    } else if (error.response && error.response.status === FLARE) {
      return {
        success: false,
        code: 521,
        message: 'Server Error',
      };
    }
    console.error('SignUp API error:', error);
    return {
      success: false,
      message: error || 'SignUp failed',
    };
  }
};

const verification = async (credentials: VerifyCredentials) => {
  try {
    const response = await axiosInstance.post(
      '/api/auth/verify-otp',
      credentials,
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      return {
        success: false,
        code: 400,
        message: 'Invalid Or Expired OTP',
      };
    } else if (error.response && error.response.status === FLARE) {
      return {
        success: false,
        code: 521,
        message: 'Server Error',
      };
    }
    console.error('Verification API error:', error);
    return {
      success: false,
      message: error || 'Verification failed',
    };
  }
};

const reVerification = async (credentials: reVerificationCredentials) => {
  try {
    const response = await axiosInstance.post(
      '/api/auth/resend-verification-otp',
      credentials,
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === FLARE) {
      return {
        success: false,
        code: 521,
        message: 'Server Error',
      };
    }
    console.error('Verification API error:', error);
    return {
      success: false,
      message: error || 'Verification failed',
    };
  }
};

const fetchProfile = async (credentials: fetchProfileCredentials) => {
  try {
    const response = await axiosInstance.get('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    if (response) {
      console.log(response);
    }
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === FLARE) {
      return {
        success: false,
        code: FLARE,
        message: 'Server Error',
      };
    }
    console.error('User Fetching API error:', error);
    return {
      success: false,
      message: error || 'Verification failed',
    };
  }
};

axiosInstance?.interceptors.response?.use(
  response => response,
  (error: AxiosError) => {
    if (error?.response?.status === UNAUTHORIZED) {
      //
    }
    return Promise.reject(error);
  },
);

export {
  axiosInstance,
  login,
  signup,
  verification,
  reVerification,
  fetchProfile,
};
