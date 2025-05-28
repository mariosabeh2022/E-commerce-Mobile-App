import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {styles} from '../../styles/productForms';
import {createEditProductStyles} from '../../styles/createEditProduct.style';
import CustomButton from '../../components/atoms/customButton/customButton';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../contexts/themeContext';
import {AuthenticatedTabParamList} from '../../navigation/navigator/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomView from '../../components/molecules/customView/customView';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import {schema} from '../../utils/productCreationFromValidation';
import {z} from 'zod';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
import {createProduct} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';
import MapScreen from '../mapScreen/mapScreen';
import {useMapStore} from '../../stores/mapCoordinates/mapStore';
import {useImageStore} from '../../stores/uploadStore/uploadStore';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import CustomModalIcons from '../../components/atoms/customModalIcons/customModalIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';
import {AuthenticatedStackParamList} from '../../navigation/stacks/authenticatedStack';

type UploadScreenNavigationProp = NativeStackNavigationProp<
  AuthenticatedTabParamList,
  'Devices'
>;
const CreateProduct = () => {
  const userToken = useAuthStore(state => state.accessToken);
  type FormData = z.infer<typeof schema>;

  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const image = useImageStore(state => state.images);
  const removeImage = useImageStore(state => state.removeImage);
  const clearImages = useImageStore(state => state.clearImages);
  const center = useMapStore(state => state.center);
  const setImage = useImageStore(state => state.setImage);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
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
      images: [],
    },
  });

  const [resultMessage, setResultMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModalVisibility = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);
  const navigation = useNavigation<
    UploadScreenNavigationProp & AuthenticatedStackParamList
  >();

  const handleSelectImage = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      if (!selectedImage.uri) {
        setResultMessage('Selected image has no URI');
        return;
      }

      const newImage = {
        uri: selectedImage.uri,
        _id: `${Date.now()}`,
      };

      setImage(newImage);

      const currentImages = getValues('images') || [];
      const updatedImages = [...currentImages, newImage];
      setValue('images', updatedImages.slice(0, 5), {shouldValidate: true});
    }
  };

  useEffect(() => {
    setValue('location.longitude', center[0]);
    setValue('location.latitude', center[1]);
    setValue('images', Array.isArray(image) ? image.slice(0, 5) : [image]);
  }, [center, image, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResultMessage('');
    if (!data.images || data.images.length === 0) {
      setResultMessage('Please select at least one image');
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
        images: data.images.slice(0,5),
      });

      if (result.success === true) {
        ToastAndroid.show('Product Created Successfully!', ToastAndroid.SHORT);
        reset({
          title: '',
          description: '',
          price: 1,
          location: {
            name: '',
            longitude: center[0],
            latitude: center[1],
          },
          images: [],
        });
        clearImages();
        navigation.navigate('Devices', {fromScreen: 'Create Product'});
      } else {
        setResultMessage(result.message ?? 'Failed to create product');
      }
    } catch (err) {
      setResultMessage('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };
  const handleKeyboardDismiss = () => Keyboard.dismiss();
  const showToastErrorMessage = () =>
    ToastAndroid.show('Image Load Error', ToastAndroid.SHORT);
  return (
    <View style={styles.container}>
      <CustomContainer>
        <>
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
                  <>
                    <View style={createEditProductStyles.uploadIconContainer}>
                      <Pressable onPress={toggleModalVisibility}>
                        <Icon
                          name="upload"
                          size={40}
                          style={isAppDark ? {color: 'white'} : {color: 'gray'}}
                        />
                      </Pressable>
                    </View>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={
                        createEditProductStyles.imagesScrollView
                      }>
                      <Controller
                        control={control}
                        name="images"
                        render={({field: {value}}) => {
                          return (
                            <TouchableWithoutFeedback
                              onPress={handleKeyboardDismiss}>
                              <KeyboardAvoidingView>
                                <ScrollView
                                  horizontal
                                  style={createEditProductStyles.scroll}>
                                  {Array.isArray(value) && value.length > 0 ? (
                                    value.map(img => (
                                      <View key={img._id}>
                                        <Pressable
                                          onPress={() => removeImage(img._id)}
                                          style={
                                            createEditProductStyles.removeIcon
                                          }>
                                          <CustomIcon type="times-circle" />
                                        </Pressable>
                                        <Image
                                          key={img._id}
                                          source={{uri: img.uri}}
                                          style={createEditProductStyles.image}
                                          resizeMode="cover"
                                          onError={showToastErrorMessage}
                                        />
                                      </View>
                                    ))
                                  ) : (
                                    <Text
                                      style={createEditProductStyles.noImages}>
                                      No image Yet
                                    </Text>
                                  )}
                                </ScrollView>
                              </KeyboardAvoidingView>
                            </TouchableWithoutFeedback>
                          );
                        }}
                      />
                    </ScrollView>
                  </>
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
          <Modal visible={showModal} animationType="slide" transparent={true}>
            <View style={styles.mainModalContainer}>
              <Pressable
                style={styles.upperOverlay}
                onPress={toggleModalVisibility}
              />
              <View
                style={
                  isAppDark ? styles.darkModalContainer : styles.modalContainer
                }>
                <Pressable onPress={toggleModalVisibility}>
                  <CustomIcon type="times-circle" />
                </Pressable>
                <CustomTitle text="Profile Photo" />
                <View>
                  <CustomModalIcons
                    includeRemove={false}
                    onSelectImage={handleSelectImage}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </>
      </CustomContainer>
    </View>
  );
};

export default CreateProduct;
