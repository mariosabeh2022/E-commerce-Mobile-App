import {API_URL} from '../config/index';

export const fileToHttps = (images: {uri: string; _id: string}[]) => {
  return images.map(img => ({
    ...img,
    uri: `${API_URL + img.uri.substring(7)}`,
  }));
};
