import {axiosInstance} from '../../lib/axiosInstance';
import {editProductCredentials} from './editProductCall.type';

export const editProduct = async (credentials: editProductCredentials) => {
  const {token, title, description, price, location, images} = credentials;

  try {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('location', JSON.stringify(location));

    if (images.length === 0) {
      throw new Error('No images provided');
    }

    images.forEach((image, index) => {
      if (image.uri) {
        const uriParts = image.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('images', {
          uri: image.uri,
          name: `photo_${index}.${fileType}`,
          type: `image/${fileType}`,
        } as any);
      }
    });

    const {data} = await axiosInstance.put(
      `/api/products/${credentials.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return data;
  } catch (error: any) {
    return {
      success: false,
      status: error?.response?.status,
      message: error?.response?.data?.message || 'Failed To Edit, Try Again',
    };
  }
};
