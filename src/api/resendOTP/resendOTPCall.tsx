import {axiosInstance, handleError} from '../../lib/axiosInstance';
import {reVerificationCredentials} from './resendOTPCall.type';
import {errorCodes} from '../../lib/errorCodes';
const {FLARE} = errorCodes;

export const reVerification = async (
  credentials: reVerificationCredentials,
) => {
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
