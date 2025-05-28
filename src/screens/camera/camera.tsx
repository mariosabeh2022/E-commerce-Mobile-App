import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Linking,
  ToastAndroid,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {RouteProp} from '@react-navigation/native';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {saveToDeviceStorage} from '../../screens/createProduct/saveToDevice';
import useUserStore from '../../stores/profileStore/profileStore';
import {styles} from './camera.style';
import PermissionNotGranted from '../PermissionNotGranted/PermissionNotGranted';

type AuthenticatedStackParamList = {
  CameraScreen: {
    onCapture?: (photo: any) => void;
  };
};

type CameraScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  'CameraScreen'
>;

export default function CameraScreen() {
  const {updateProfileImage} = useUserStore();
  const route = useRoute<CameraScreenRouteProp>();
  const navigation = useNavigation();
  const onCapture = route.params?.onCapture;
  const [isCapturing, setIsCapturing] = useState(false);
  const [useFrontCam, setUseFrontCam] = useState(false);

  const toggleCamera = useCallback(() => setUseFrontCam(prev => !prev), []);
  const device = useCameraDevice(useFrontCam ? 'front' : 'back');
  const camera = useRef<Camera>(null);

  const {hasPermission, requestPermission} = useCameraPermission();

  const handleCameraPermission = useCallback(async () => {
    await requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    handleCameraPermission();
  }, [handleCameraPermission]);

  const openSettings = async () => await Linking.openSettings();

  const handleCapture = async () => {
    try {
      setIsCapturing(false);
      const photo = await camera.current?.takePhoto();

      if (photo) {
        const imagePath = photo.path.startsWith('file://')
          ? photo.path
          : `file://${photo.path}`;
        await saveToDeviceStorage(imagePath);

        if (onCapture) {
          onCapture(photo);
        } else {
          updateProfileImage(imagePath);
        }

        navigation.goBack();
      }
    } catch (error) {
      ToastAndroid.show('Capture Error', ToastAndroid.SHORT);
    }
  };

  if (!hasPermission) {
    return <PermissionNotGranted openSettings={openSettings}/>;
  }

  if (device == null) {
    return (
      <View style={styles.permissionDenied}>
        <CustomIcon type="times-circle" />
      </View>
    );
  }
  const handleGoBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <Pressable style={styles.flip} onPress={toggleCamera}>
        <CustomIcon type="sync-alt" />
      </Pressable>
      <TouchableOpacity
        style={isCapturing ? styles.capturing : styles.capture}
        onPress={handleCapture}
      />
      <Pressable style={styles.close} onPress={handleGoBack}>
        <CustomIcon type="times-circle" />
      </Pressable>
    </View>
  );
}
