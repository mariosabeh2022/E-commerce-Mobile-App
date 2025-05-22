import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Pressable,
  TouchableOpacity,
  Linking,
  StyleSheet,
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

  const toggleCamera = () => setUseFrontCam(prev => !prev);
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

  const handleCaptureButton = () => {
    setIsCapturing(true);
    handleCapture();
  };

  const handleCapture = async () => {
    try {
      setIsCapturing(false);
      const photo = await camera.current?.takePhoto();

      if (photo) {
        const imagePath = photo.path.startsWith('file://')
          ? photo.path
          : `file://${photo.path}`;
        console.log(imagePath);
        await saveToDeviceStorage(imagePath);

        if (onCapture) {
          // Delegate handling to parent
          onCapture(photo);
        } else {
          // No delegate? Handle here locally
          updateProfileImage(imagePath);
        }

        navigation.goBack();
      }
    } catch (error) {
      console.error('Capture Error:', error);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionDenied}>
        <Pressable onPress={openSettings}>
          <CustomIcon type="exclamation-triangle" />
        </Pressable>
      </View>
    );
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
        onPress={handleCaptureButton}
      />
      <Pressable style={styles.close} onPress={handleGoBack}>
        <CustomIcon type="times-circle" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  camera: {flex: 1},
  flip: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  capture: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  capturing: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
  },
  close: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  permissionDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
