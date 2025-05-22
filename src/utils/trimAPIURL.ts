export const trimAPIURL = (images: {uri: string; _id: string}[]) => {
  return images.map(img => ({
    ...img,
    uri: `${img.uri.substring(35)}`,
  }));
};
