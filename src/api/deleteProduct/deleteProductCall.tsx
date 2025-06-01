import {axiosInstance} from '../../lib/axiosInstance';
import {deleteProductCredentials} from './deleteProductCall.type';

export const deleteProduct = async (credentials: deleteProductCredentials) => {
  try {
    const {data} = await axiosInstance.delete(
      `/api/products/${credentials.id}`,
      {
        headers: {
          Authorization: `Bearer ${credentials.token}`,
        },
      },
    );
    return data;
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To delete',
    };
  }
};
