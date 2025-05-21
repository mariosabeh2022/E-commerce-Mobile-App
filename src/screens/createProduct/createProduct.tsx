import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Linking, // For opening device settings if permission denied
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';

// CAMERA IMPORTS (commented out):
// Uncomment these and install react-native-vision-camera to enable camera functionality
// import {
//   Camera,
//   useCameraDevice,
//   useCameraPermission,
// } from 'react-native-vision-camera';

import {useCallback, useEffect, useRef, useState} from 'react';
import {styles} from './createProduct.style';

// Uncomment this when implementing saving photos to device storage
// import { saveToDeviceStorage } from './saveToDevice';

import CustomButton from '../../components/atoms/customButton/customButton';
// import CustomIcon from '../../components/atoms/customIcon/customIcon'; // For camera UI icons

import PermissionNotGranted from '../permissionNotGranted/permissionNotGranted';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../../contexts/themeContext';

import {AuthenticatedTabParamList} from '../../navigation/navigator/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import { AuthenticatedStackParamList } from '../../navigation/stacks/authenticatedStack'; // For camera screen route type

import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomView from '../../components/molecules/customView/customView';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
// import CustomPressable from '../../components/molecules/customPressable/customPressable'; // For pressable UI components
// import CustomLink from '../../components/atoms/customLink/customLink'; // For clickable links

import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {schema} from '../../utils/productCreationFromValidation';
import {z} from 'zod';

import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
import {createProduct} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';
import MapScreen from './mapScreen';
import {useMapStore} from '../../stores/mapCoordinates/mapStore';
import CustomImageInput from '../../components/atoms/customImageInput/customImageInput';
import {useImageStore} from '../../stores/uploadStore/uploadStore';
import {sanitizeImageUrls} from '../../utils/sanitizeImages';

type UploadScreenNavigationProp = NativeStackNavigationProp<
  AuthenticatedTabParamList,
  'Devices'
>;

// type CameraScreenRouteProp = RouteProp<
//   AuthenticatedStackParamList,
//   'CameraScreen'
// >;

const CreateProduct = () => {
  // Access user token for API authentication
  const userToken = useAuthStore(state => state.accessToken);
  console.log('Create Product user token', userToken);
  // Uncomment below to access navigation params if using camera capture callback
  // const route = useRoute<CameraScreenRouteProp>();
  // const onCapture = route.params?.onCapture;

  // --- CAMERA STATES & REFS (commented out): ---
  // const [isSaving, setIsSaving] = useState(false);
  // const [isSaved, setIsSaved] = useState(false);
  // const [isCapturing, setIsCapturing] = useState(false);
  // const [useFrontCam, setUseFrontCam] = useState(false);

  // Toggle front/back camera
  // const toggleCamera = () => setUseFrontCam(!useFrontCam);

  // Get camera device info (front or back)
  // const device = useCameraDevice(useFrontCam ? 'front' : 'back');

  // Camera ref for triggering photo capture
  // const camera = useRef<Camera>(null);

  // Camera permissions hooks
  // const { hasPermission, requestPermission } = useCameraPermission();

  // Function to request camera permission on mount
  // const handleCameraPermission = useCallback(async () => {
  //   await requestPermission();
  // }, [requestPermission]);

  // Request permission on component mount
  // useEffect(() => {
  //   handleCameraPermission();
  // }, [handleCameraPermission]);

  // Opens device settings so user can enable camera permission manually
  // const openSettings = async () => await Linking.openSettings();

  // Capture photo handler triggered by button press
  // const handleCaptureButton = () => {
  //   setIsCapturing(true);
  //   handleCapture();
  // };

  // Async function to capture photo, save it locally, and call onCapture callback
  // const handleCapture = async () => {
  //   setIsSaving(true);
  //   setIsSaved(false);
  //   setIsCapturing(false);
  //   const photo = await camera.current?.takePhoto();
  //   if (photo) {
  //     await saveToDeviceStorage(file://${photo?.path});
  //     setIsSaving(false);
  //     setIsSaved(true);
  //     if (onCapture) {
  //       onCapture(photo);
  //     }
  //     navigation.goBack();
  //   }
  //   // Reset saving states after delay
  //   setTimeout(() => {
  //     setIsSaving(true);
  //     setIsSaved(false);
  //   }, 2500);
  // };

  // --- END CAMERA RELATED CODE ---

  type FormData = z.infer<typeof schema>;

  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const image = useImageStore(state => state.images);
  const clearImages = useImageStore(state => state.clearImage);
  // Map center coordinates from store
  const center = useMapStore(state => state.center);
  const setImage = useImageStore(state => state.setImage);

  useEffect(() => {
    if (image) {
      setImage(image);
    }
  }, [image, setImage]);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      price: 1,
      location: {
        name: '',
        longitude: center[0],
        latitude: center[1],
      },
      image: {uri: '', _id: ''},
    },
  });

  // Update form location if map center changes
  useEffect(() => {
    setValue('location.longitude', center[0]);
    setValue('location.latitude', center[1]);
    setValue('image', image!);
  }, [center, image, setValue]);

  const [resultMessage, setResultMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<UploadScreenNavigationProp>();

  // Submit handler for product creation form
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResultMessage('');

    if (!data.image || !data.image.uri) {
      setResultMessage('Please select an image');
      setIsLoading(false);
      return;
    }

    try {
      const result = await createProduct({
        token: userToken!,
        title: data.title,
        description: data.description,
        price: Number(data.price),
        location: data.location,
        image: {
          uri: data.image.uri,
          _id: data.image._id,
        },
      });

      if (result.success === true) {
        reset({
          title: '',
          description: '',
          price: 1,
          location: {
            name: '',
            longitude: center[0],
            latitude: center[1],
          },
          image: {uri: '', _id: ''}, // Reset form image here
        });
        clearImages(); // optionally clear Zustand if needed
        navigation.navigate('Devices');
      } else {
        setResultMessage(result.message ?? 'Failed to create product');
      }
    } catch (err) {
      console.error('Product Creation:', err);
      setResultMessage('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };
  const handleKeyboardDismiss = () => Keyboard.dismiss();

  // Optional: show permission denied screen if camera permission not granted
  // if (!hasPermission) {
  //   return <PermissionNotGranted openSettings={openSettings} />;
  // }
  // Optional: show message if no camera devices found
  // if (device == null) {
  //   return <PermissionNotGranted text="No Devices Were Found" />;
  // }
  useEffect(() => {
    console.log('Form Errors:', errors);
  }, [errors]);
  return (
    <View style={styles.container}>
      <CustomContainer>
        <>
          <CustomTitle text="Create Product" />
          <View style={styles.form}>
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
                <CustomView>
                  <>
                    <Controller
                      control={control}
                      name="title"
                      render={({field: {value, onChange}}) => (
                        <CustomInput
                          placeholder="Product Title"
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />
                    {errors.title && (
                      <CustomErrorMessage message={errors.title?.message} />
                    )}
                  </>
                </CustomView>

                <CustomView>
                  <>
                    <Controller
                      control={control}
                      name="description"
                      render={({field: {value, onChange}}) => (
                        <CustomInput
                          placeholder="Description"
                          value={value}
                          onChangeText={onChange}
                          multiline={true}
                        />
                      )}
                    />
                    {errors.description && (
                      <CustomErrorMessage
                        message={errors.description?.message}
                      />
                    )}
                  </>
                </CustomView>

                <CustomView>
                  <>
                    <Controller
                      control={control}
                      name="price"
                      render={({field: {value, onChange}}) => (
                        <CustomInput
                          placeholder="Price"
                          value={value !== undefined ? value.toString() : ''}
                          onChangeText={text => {
                            if (text === '') {
                              onChange(0);
                              return;
                            }
                            const number = parseFloat(text);
                            if (!isNaN(number)) {
                              onChange(number);
                            }
                          }}
                          keyboardType="numeric"
                        />
                      )}
                    />
                    {errors.price && (
                      <CustomErrorMessage message={errors.price?.message} />
                    )}
                  </>
                </CustomView>
                <CustomView>
                  <>
                    <Controller
                      control={control}
                      name="location.name"
                      render={({field: {value, onChange}}) => (
                        <CustomInput
                          placeholder="Country"
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />
                    {errors.location?.name && (
                      <CustomErrorMessage
                        message={errors.location?.name?.message}
                      />
                    )}
                  </>
                </CustomView>

                <CustomView>
                  <Controller
                    control={control}
                    name="image"
                    render={({field: {value, onChange}}) => (
                      <CustomImageInput
                        image={value}
                        onImagesChange={onChange}
                      />
                    )}
                  />
                </CustomView>

                <CustomView>
                  {isLoading ? (
                    <ActivityIndicator
                      size="large"
                      color={isAppDark ? darkBaseColor : lightBaseColor}
                    />
                  ) : (
                    <Pressable onPress={handleSubmit(onSubmit)}>
                      <CustomButton text="Create Product" />
                    </Pressable>
                  )}
                </CustomView>

                {resultMessage !== '' && (
                  <CustomView>
                    <CustomErrorMessage message={resultMessage} />
                  </CustomView>
                )}
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>

          <MapScreen />
        </>
      </CustomContainer>

      {/* Render map screen for location selection */}
      {/* <MapScreen /> */}

      {/* Uncomment below to add camera UI */}
      {/* 
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
        onPress={() => navigation.navigate('Devices')}
      >
        <CustomIcon type="times-circle" />
      </Pressable>
      */}
    </View>
  );
};

export default CreateProduct;
