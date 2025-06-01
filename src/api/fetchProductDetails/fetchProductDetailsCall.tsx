import {axiosInstance} from '../../lib/axiosInstance';
import {productDetailCredentials} from './fetchProductDetailsCall.type';

export const productDetails = async (credentials: productDetailCredentials) => {
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
