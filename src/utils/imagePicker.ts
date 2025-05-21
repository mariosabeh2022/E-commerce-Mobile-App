import {PermissionsAndroid, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const requestGalleryPermission = async (): Promise<boolean> => {
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
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
};

export const pickImageFromGallery = async () => {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) {
    console.log('Gallery permission denied');
    return null;
  }

  try {
    const selectedImage = await ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
    });

    return {
      uri: selectedImage.path,
      _id: `${Math.floor(Math.random() * 9000) + 1000}`,
    };
  } catch (error) {
    console.log('Image picker error:', error);
    return null;
  }
};
