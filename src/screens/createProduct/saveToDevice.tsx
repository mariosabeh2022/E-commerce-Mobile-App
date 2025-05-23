import {ToastAndroid} from 'react-native';
import RNFS from 'react-native-fs';

export const saveToDeviceStorage = async (filePath: string) => {
  try {
    const destPath = `${
      RNFS.PicturesDirectoryPath
    }/Shopfinity${Date.now()}.jpg`;
    await RNFS.copyFile(filePath, destPath);
  } catch (error) {
    ToastAndroid.show('Error Saving File', ToastAndroid.SHORT);
  }
};
