import {axiosInstance} from '../../lib/axiosInstance';

export const updateProfile = async ({
  token,
  formData,
}: {
  token: string;
  formData: FormData;
}) => {
  try {
    const {data} = await axiosInstance.put('/api/user/profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return {success: true, data: data.data};
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To Update Profile',
    };
  }
};
