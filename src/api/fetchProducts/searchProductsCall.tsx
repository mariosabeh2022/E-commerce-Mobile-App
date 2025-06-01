import {searchProductsCredentials} from './searchProductsCall.type';
import {axiosInstance} from '../../lib/axiosInstance';

export const searchProducts = async (
  credentials: searchProductsCredentials,
) => {
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
