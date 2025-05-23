import {PermissionsAndroid, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    try {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.CAMERA
          : PermissionsAndroid.PERMISSIONS.CAMERA;

      const granted = await PermissionsAndroid.request(permission, {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
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

export const pickImageFromCamera = async () => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    return null;
  }

  try {
    const capturedImage = await ImagePicker.openCamera({
      cropping: false,
      mediaType: 'photo',
    });

    return {
      uri: capturedImage.path,
      _id: `${Math.floor(Math.random() * 9000) + 1000}`,
    };
  } catch (error) {
    return null;
  }
};
