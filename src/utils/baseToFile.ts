export const baseToFile = (images: {uri: string; _id: string}[]) => {
  return images.map(img => ({
    ...img,
    uri: `${'file://' + img.uri.substring(35)}`,
  }));
};
