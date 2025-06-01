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

import CustomButton from '../../components/atoms/customButton/customButton';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
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
import useAuthStore from '../../stores/authStore/authStore';
import MapScreen from '../mapScreen/mapScreen';
import {useMapStore} from '../../stores/mapCoordinates/mapStore';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import CustomModalIcons from '../../components/atoms/customModalIcons/customModalIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';
import {AuthenticatedStackParamList} from '../../navigation/stacks/authenticatedStack';
import {useQuery} from '@tanstack/react-query';
import {addFileProtocolToUris} from '../../utils/imagePrefix';
import {createEditProductStyles} from '../../styles/createEditProduct.style';
import {useImageStore} from '../../stores/uploadStore/uploadStore';
import {productDetails} from '../../api/fetchProductDetails/fetchProductDetailsCall';
import {editProduct} from '../../api/editProduct/editProductCall';

type EditProductRouteProp = RouteProp<
  AuthenticatedStackParamList,
  'EditProduct'
>;
type FormData = z.infer<typeof schema>;

type image = {
  id?: number;
  _id?: string;
  uri: string;
  url?: string;
};

const EditProduct = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthenticatedTabParamList>>();
  const route = useRoute<EditProductRouteProp>();
  const {id} = route.params;
  const userToken = useAuthStore(state => state.accessToken);
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const center = useMapStore(state => state.center);
  const image = useImageStore(state => state.images);
  const [resultMessage, setResultMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModalVisibility = useCallback(
    () => setShowModal(prev => !prev),
    [],
  );
  const [combinedImages, setCombinedImages] = useState<image[]>([]);
  const removeImage = useImageStore(state => state.removeImage);
  const setImage = useImageStore(state => state.setImage);

  const [removedImageIds, setRemovedImageIds] = useState<Set<string>>(
    new Set(),
  );
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

  const {data: details, isFetching} = useQuery({
    queryKey: ['fetchDetails', id],
    queryFn: () => productDetails({token: userToken!, id}),
    enabled: !!userToken,
  });
  function normalizeImages(images: image[]): {uri: string; _id: string}[] {
    return images.map(item => ({
      uri: item.url ?? item.uri,
      _id: item._id!, // assume _id exists and is stable
    }));
  }
  useEffect(() => {
    if (details?.data) {
      const {title, description, price, location, images} = details.data;

      // Filter out images that have been marked for removal
      const formattedImages = addFileProtocolToUris(images).filter(
        img => !removedImageIds.has(img._id!),
      );

      // Filter out local images that have been marked for removal
      const updatedLocalImages = normalizeImages(image).filter(
        img => !removedImageIds.has(img._id),
      );

      const allImages = [...formattedImages, ...updatedLocalImages].slice(0, 5);
      setCombinedImages(allImages);

      reset({
        title,
        description,
        price,
        location,
        images: allImages,
      });
    }
  }, [details, reset, image, removedImageIds]);

  useEffect(() => {
    setValue('location.longitude', center[0]);
    setValue('location.latitude', center[1]);
  }, [center, setValue]);

  const handleSelectImage = async () => {
    const currentImagesInForm = getValues('images') || [];

    if (currentImagesInForm.length >= 5) {
      ToastAndroid.show(
        'You can only upload up to 5 images.',
        ToastAndroid.SHORT,
      );
      return;
    }
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
  const handleKeyboardDismiss = () => Keyboard.dismiss();
  const showToastErrorMessage = () =>
    ToastAndroid.show('Image Load Error', ToastAndroid.SHORT);

  const handleRemoveImage = (_id: string) => () => {
    // If the image being removed has an _id (meaning it's from the original product details),
    // add it to the removedImageIds set.
    const removedImg = combinedImages.find(img => img._id === _id);
    if (removedImg && removedImg._id) {
      setRemovedImageIds(prevIds => new Set(prevIds).add(removedImg._id!));
    }

    // Remove from the local image store if it's a newly added image
    removeImage(_id);

    // Update local combinedImages and form state immediately for UX
    const updatedImages = combinedImages.filter(img => img._id !== _id);
    setCombinedImages(updatedImages);
    setValue(
      'images',
      updatedImages.map(img => ({
        uri: img.uri,
        _id: img._id ?? `${Date.now()}-${Math.random()}`,
      })),
      {shouldValidate: true},
    );
  };
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setResultMessage('');

    if (!data.images || data.images.length === 0) {
      setResultMessage('Please select at least one image');
      setIsLoading(false);
      return;
    }

    try {
      const result = await editProduct({
        token: userToken!,
        id: id,
        title: data.title,
        description: data.description,
        price: Number(data.price),
        location: data.location,
        images: data.images,
      });

      if (result.success) {
        ToastAndroid.show('Product Updated Successfully!', ToastAndroid.SHORT);
        navigation.navigate('Devices', {
          fromScreen: 'Edit Product',
        });
      } else {
        setResultMessage(result.message ?? 'Failed to update product');
      }
    } catch (err) {
      ToastAndroid.show(
        'A server error occurred. Please try again.',
        ToastAndroid.SHORT,
      );
      setResultMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={isAppDark ? darkBaseColor : lightBaseColor}
        />
      </View>
    );
  }

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
                                          onPress={handleRemoveImage(img._id!)} // Ensure _id is passed
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
                      <CustomButton text="Edit Product" />
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

          <MapScreen
            coordinates={[
              getValues().location.longitude,
              getValues().location.latitude,
            ]}
          />

          <Modal visible={showModal} animationType="slide" transparent>
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
                <CustomTitle text="Upload Photo" />
                <CustomModalIcons
                  includeRemove={false}
                  onSelectImage={handleSelectImage}
                />
              </View>
            </View>
          </Modal>
        </>
      </CustomContainer>
    </View>
  );
};

export default EditProduct;
