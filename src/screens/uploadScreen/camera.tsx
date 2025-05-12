import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useEffect, useRef, useState} from 'react';
import {styles} from './camera.style';
import {saveToDeviceStorage} from './saveToDevice';
import CustomButton from '../../components/atoms/customButton/customButton';
import PermissionNotYetGranted from '../PermissionNotGranted/PermissionNotGranted';

const CamPermissionsCheck = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const {hasPermission, requestPermission} = useCameraPermission();
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);
  const handleCapture = async () => {
    setIsSaving(true);
    setIsSaved(false);
    const photo = await camera.current?.takePhoto();
    if (photo) {
      await saveToDeviceStorage(`file://${photo?.path}`);
      setIsSaving(false);
      setIsSaved(true);
    }
    setTimeout(() => {
      setIsSaving(true);
    }, 2500);
  };

  if (!hasPermission)
    return <PermissionNotYetGranted text="Permission Not Yet Granted" />;
  if (device == null)
    return <PermissionNotYetGranted text="No devices were found" />;
  else {
    return (
      <View style={styles.container}>
        <View style={isSaved && !isSaving ? styles.message : ''}>
          <CustomButton text="Image Saved" />
        </View>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <TouchableOpacity style={styles.capture} onPress={handleCapture} />
      </View>
    );
  }
};
export default CamPermissionsCheck;
