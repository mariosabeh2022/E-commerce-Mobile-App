import RNFS from 'react-native-fs';

// Use this function to save to the Pictures folder
export const saveToDeviceStorage = async (filePath: string) => {
  try {
    const destPath = `${RNFS.PicturesDirectoryPath}/Shopfinity${Date.now()}.jpg`;
    console.log('Pictures directory:', RNFS.PicturesDirectoryPath);
    await RNFS.copyFile(filePath, destPath);

    console.log('Photo saved to:', destPath);
  } catch (error) {
    console.error('Error saving file:', error);
  }
};
