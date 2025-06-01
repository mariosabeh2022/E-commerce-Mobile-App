import {axiosInstance, handleError} from '../../lib/axiosInstance';
import {fetchProfileCredentials} from './fetchProfile.type';
import {errorCodes} from '../../lib/errorCodes';
const {FLARE} = errorCodes;

export const fetchProfile = async ({token}: fetchProfileCredentials) => {
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
