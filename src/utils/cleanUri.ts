import {API_URL} from '../config/index';

export const replaceFileUris = (
  images: {uri?: string; _id: string}[],
): {uri: string; _id: string}[] => {
  return images
    .filter(
      (img): img is {uri: string; _id: string} => typeof img.uri === 'string',
    )
    .map(img => ({
      ...img,
      uri: img.uri.startsWith('file://') ? API_URL + img.uri.substring(7) : img.uri,
    }));
};
