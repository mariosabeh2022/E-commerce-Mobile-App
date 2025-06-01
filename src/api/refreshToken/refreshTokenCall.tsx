import {axiosInstance, handleError} from '../../lib/axiosInstance';
import {RefreshCredentials} from './refreshTokenCall.type';
import {errorCodes} from '../../lib/errorCodes';
const {FLARE, UNAUTHORIZED} = errorCodes;

export const refreshTokenFn = async (credentials: RefreshCredentials) => {
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
