import {Linking, Pressable, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useCallback, useEffect, useRef, useState} from 'react';
import {styles} from './camera.style';
import {saveToDeviceStorage} from './saveToDevice';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import PermissionNotGranted from '../permissionNotGranted/permissionNotGranted';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthenticatedTabParamList} from '../../navigation/navigator/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthenticatedStackParamList} from '../../navigation/stacks/authenticatedStack';
type UploadScreenNavigationProp = NativeStackNavigationProp<
  AuthenticatedTabParamList,
  'Devices'
>;
type CameraScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  'CameraScreen'
>;

const CamPermissionsCheck = () => {
  const route = useRoute<CameraScreenRouteProp>();
  const onCapture = route.params?.onCapture;
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [useFrontCam, setUseFrontCam] = useState(false);
  const toggleCamera = () => setUseFrontCam(!useFrontCam);
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
    setIsSaving(true);
    setIsSaved(false);
    setIsCapturing(false);
    const photo = await camera.current?.takePhoto();
    if (photo) {
      await saveToDeviceStorage(`file://${photo?.path}`);
      setIsSaving(false);
      setIsSaved(true);
      if (onCapture) {
        onCapture(photo);
      }
      navigation.goBack();
    }

    setTimeout(() => {
      setIsSaving(true);
      setIsSaved(false);
    }, 2500);
  };
  const navigation = useNavigation<UploadScreenNavigationProp>();
  if (!hasPermission) {
    return <PermissionNotGranted openSettings={openSettings} />;
  }
  if (device == null) {
    return <PermissionNotGranted text="No Devices Were Found" />;
  }
  return (
    <View style={styles.container}>
      <View style={isSaved && !isSaving ? styles.message : ''}>
        <CustomButton text="Saved To Files !" />
      </View>
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
      <Pressable
        style={styles.close}
        onPress={() => navigation.navigate('Devices')}>
        <CustomIcon type="times-circle" />
      </Pressable>
    </View>
  );
};
export default CamPermissionsCheck;
