import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';

export const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission, {
        title: 'Gallery Permission',
        message: 'App needs access to your photos',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      ToastAndroid.show('Permissions Not Granted', ToastAndroid.SHORT);
      return false;
    }
  } else {
    return true; // iOS handled by library
  }
};
