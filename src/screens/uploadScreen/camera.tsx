import {Pressable, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {useEffect, useRef, useState} from 'react';
import {styles} from './camera.style';
import {saveToDeviceStorage} from './saveToDevice';
import CustomButton from '../../components/atoms/customButton/customButton';
import PermissionNotYetGranted from '../permissionNotGranted/PermissionNotGranted';
import CustomIcon from '../../components/atoms/customIcon/customIcon';

const CamPermissionsCheck = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [useFrontCam, setUseFrontCam] = useState(false);
  const toggleCamera = () => setUseFrontCam(!useFrontCam);
  const device = useCameraDevice(useFrontCam ? 'front' : 'back');
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
      setIsSaved(false);
    }, 2500);
  };

  if (!hasPermission)
    return <PermissionNotYetGranted text="Permission Not Yet Granted" />;
  if (device == null)
    return <PermissionNotYetGranted text="No devices were found" />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={isSaved && !isSaving ? styles.message : ''}>
        <CustomButton text="Image Saved" />
      </View>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFillObject}
        device={device}
        isActive={true}
        photo={true}
      />
      <Pressable style={styles.flip} onPress={toggleCamera}>
        <CustomIcon type="sync-alt" />
      </Pressable>
      <TouchableOpacity style={styles.capture} onPress={handleCapture} />
    </SafeAreaView>
  );
};
export default CamPermissionsCheck;
