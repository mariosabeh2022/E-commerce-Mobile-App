import { fetchProductsCredentials } from './fetchProductsCall.type';
import {axiosInstance} from '../../lib/axiosInstance';

export const fetchProducts = async (credentials: fetchProductsCredentials) => {
  try {
    const {token, ...queryParams} = credentials;
    const {data} = await axiosInstance.get('/api/products', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: queryParams.page ?? 1,
        limit: queryParams.limit ?? 10,
        minPrice: queryParams.minPrice,
        maxPrice: queryParams.maxPrice,
        sortBy: queryParams.sortBy,
        order: queryParams.order ?? 'desc',
      },
    });
    return data;
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To Load Products',
    };
  }
};
