import RNFS from 'react-native-fs';

export const saveToDeviceStorage = async (filePath: string) => {
  try {
    const destPath = `${RNFS.PicturesDirectoryPath}/Shopfinity${Date.now()}.jpg`;
    await RNFS.copyFile(filePath, destPath);
  } catch (error) {
    console.error('Error saving file:', error);
  }
};
