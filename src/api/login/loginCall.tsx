import {errorCodes} from '../../lib/errorCodes';
import {axiosInstance, handleError} from '../../lib/axiosInstance';
import {LoginCredentials} from './loginCall.type';
const {FLARE, UNAUTHORIZED, NOT_FOUND, NOT_VERIFIED} = errorCodes;

export const login = async (credentials: LoginCredentials) => {
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
