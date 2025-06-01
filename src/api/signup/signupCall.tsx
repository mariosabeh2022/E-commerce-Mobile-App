import {axiosInstance, handleError} from '../../lib/axiosInstance';
import {SignUpCredentials} from './signupCall.type';
import {errorCodes} from '../../lib/errorCodes';
const {FLARE, EXISTS} = errorCodes;

export const signup = async (credentials: SignUpCredentials) => {
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
