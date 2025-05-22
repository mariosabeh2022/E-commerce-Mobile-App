import {API_URL} from '../config/index';

export const addFileProtocolToUris = (images: {url: string; _id: string}[]) => {
  return images.map(img => ({
    ...img,
    uri: `${API_URL + img.url}`,
  }));
};
