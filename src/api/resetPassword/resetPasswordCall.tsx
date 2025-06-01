import {resetPasswordCredentials} from './resetPasswordCall.type';
import {axiosInstance, handleError} from '../../lib/axiosInstance';
import {errorCodes} from '../../lib/errorCodes';
const {FLARE, NOT_FOUND, NOT_VERIFIED} = errorCodes;

export const resetPassword = async (credentials: resetPasswordCredentials) => {
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
