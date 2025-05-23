import RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform, Alert} from 'react-native';

const requestStoragePermission = async () => {
  if (Platform.OS !== 'android') {
    return true;
  }

  const apiLevel = Platform.Version;

  if (apiLevel >= 33) {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    ]);
    return (
      granted['android.permission.READ_MEDIA_IMAGES'] ===
      PermissionsAndroid.RESULTS.GRANTED
    );
  } else if (apiLevel >= 29) {
    return true;
  } else {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
};

export const downloadImage = async (imageUrl: string) => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert(
      'Permission denied',
      'Cannot download image without storage permission.',
    );
    return;
  }

  try {
    const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const downloadDest =
      Platform.OS === 'android'
        ? Platform.Version >= 29
          ? `${RNFS.PicturesDirectoryPath}/${fileName}`
          : `${RNFS.PicturesDirectoryPath}/${fileName}`
        : `${RNFS.PicturesDirectoryPath}/${fileName}`;
    const options = {
      fromUrl: imageUrl,
      toFile: downloadDest,
    };

    const result = await RNFS.downloadFile(options).promise;

    if (result.statusCode === 200) {
      Alert.alert('Success', 'Image downloaded to Pictures directory');
    } else {
      Alert.alert('Failed', `Server responded with ${result.statusCode}`);
    }
  } catch (error) {
    Alert.alert('Error', `Could not download image: ${error}`);
  }
};
