import {axiosInstance, handleError} from '../../lib/axiosInstance';
import {errorCodes} from '../../lib/errorCodes';
import {VerifyCredentials} from './verifyAccountCall.type';
const {FLARE} = errorCodes;

export const verification = async (credentials: VerifyCredentials) => {
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
