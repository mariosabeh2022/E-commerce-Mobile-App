import React, {useRef, useEffect, useCallback} from 'react';
import {styles} from './detailsScreen.style';
import {
  Animated,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  Linking,
  Alert,
  TouchableOpacity,
  Share,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ProductsStackParamList} from '../../navigation/navigator/navigationTypes';
import ImageCarousel from '../../components/molecules/customCarousel/customCarousel';
import {useTheme} from '../../contexts/themeContext';
import {useQuery} from '@tanstack/react-query';
import {
  deleteProduct,
  fetchProfile,
  productDetails,
} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import MapScreen from '../mapScreen/mapScreen';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
import CustomLink from '../../components/atoms/customLink/customLink';
import useCartStore from '../../stores/cartStore/cartStore';
import CustomIcon from '../../components/atoms/customIcon/customIcon';

type DetailsScreenRouteProp = RouteProp<ProductsStackParamList, 'Details'>;
const DetailsScreen = () => {
  const addProduct = useCartStore(state => state.addProduct);
  const navigation =
    useNavigation<NativeStackNavigationProp<ProductsStackParamList>>();
  const editNavigation =
    useNavigation<NativeStackNavigationProp<ProductsStackParamList>>();
  const insets = useSafeAreaInsets();
  const route = useRoute<DetailsScreenRouteProp>();
  const {id: itemId} = route.params;
  const userToken = useAuthStore(state => state.accessToken);
  const {data: details, isFetching: fetchingDetails} = useQuery({
    queryKey: ['fetchDetails'],
    queryFn: () =>
      productDetails({
        token: userToken!,
        id: itemId,
      }),
    enabled: !!userToken,
  });
  const images = details?.data?.images?.map(
    ({_id, url}: {_id: string; url: string}) => ({
      _id: _id,
      uri: url,
    }),
  );
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const {data: userData, isFetching: fetchingProfile} = useQuery({
    queryKey: ['fetchProfile'],
    queryFn: () =>
      fetchProfile({
        token: userToken!,
      }),
    enabled: !!userToken,
  });
  const userIsCreator = details?.data?.user?._id === userData?.data?.user?.id;
  const longitude = details?.data?.location?.longitude || 35.49548;
  const latitude = details?.data?.location?.latitude || 33.88863;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    fadeIn();
  }, [fadeIn]);
  const creationDate = new Date(details?.data?.createdAt);
  const creationYear = creationDate.getFullYear();
  const cm = creationDate.getMonth() + 1;
  const creationMonth = cm < 10 ? '0' + cm : String(cm);
  const cd = creationDate.getDate();
  const creationDay = cd < 10 ? '0' + cd : String(cd);
  const formattedCreationDate = `${creationYear}-${creationMonth}-${creationDay}`;

  const updateDate = new Date(details?.data?.createdAt);
  const updateYear = updateDate.getFullYear();
  const um = creationDate.getMonth() + 1;
  const updateMonth = um < 10 ? '0' + um : String(um);
  const ud = creationDate.getDate();
  const updateDay = ud < 10 ? '0' + ud : String(ud);
  const formattedUpdateDate =
    `${updateYear}-${updateMonth}-${updateDay}` !== formattedCreationDate
      ? `${updateYear}-${updateMonth}-${updateDay}`
      : 'No updates yet';
  const openGmail = (email: string) => {
    const gmailUrl = `googlegmail://co?to=${email}`;
    Linking.canOpenURL(gmailUrl)
      .then(supported => {
        if (supported) {
          return Linking.openURL(gmailUrl);
        } else {
          return Linking.openURL(`mailto:${email}`);
        }
      })
      .catch(() => {
        Alert.alert('Error', 'Unable to open mail app');
      });
  };
  const showToastMessage = () =>
    ToastAndroid.show('Delete Cancled', ToastAndroid.SHORT);
  const showConfirmation = (onConfirm: () => void) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          onPress: showToastMessage,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: onConfirm,
        },
      ],
      {cancelable: true},
    );
  };

  const handleDeleteProduct = async () => {
    if (!userIsCreator) {
      return;
    } else {
      showConfirmation(async () => {
        try {
          await deleteProduct({token: userToken!, id: details?.data?._id});
          ToastAndroid.show('Product Deleted Successfully', ToastAndroid.SHORT);
          navigation.navigate('Products', {
            fromScreen: 'Details',
          });
        } catch (error) {
          ToastAndroid.show('Failed To Delete Product', ToastAndroid.SHORT);
        }
      });
    }
  };
  const handleEditNavigation = () => {
    editNavigation.navigate('Edit Product', {id: itemId});
  };
  const handleAddToCart = () => {
    addProduct(details.data);
    ToastAndroid.show('Added To Your Cart!', ToastAndroid.SHORT);
  };
  const handleShare = (id: string) => () => {
    const url = `ecommerceMobileApp://details/${id}`;
    Share.share({
      message: `Check out this product: ${url}`,
    });
  };
  const renderShareButton = useCallback(
    () => (
      <Pressable onPress={handleShare(itemId)}>
        <Text>
          <CustomIcon type="share-alt" />
        </Text>
      </Pressable>
    ),
    [itemId],
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: renderShareButton,
    });
  }, [navigation, renderShareButton, itemId]);
  if (fetchingDetails || fetchingProfile) {
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
    <SafeAreaView style={isAppDark ? styles.darkSaveArea : styles.saveArea}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 100,
        }}>
        <View style={isAppDark ? styles.darkContainer : styles.container}>
          <View style={styles.innerContainer}>
            <ImageCarousel images={images || []} />
          </View>
          <View style={styles.infos}>
            <Text style={isAppDark ? styles.darkTitle : styles.title}>
              {details?.data?.title}
            </Text>
            <Text style={isAppDark ? styles.darkSpec : styles.spec}>
              Specifications:
            </Text>
            <Text style={styles.desc}>{details?.data?.description}</Text>
            <Text style={isAppDark ? styles.darkPrice : styles.price}>
              Price: {details?.data?.price}$
            </Text>
            <Text style={isAppDark ? styles.darkTitle : styles.title}>
              <CustomErrorMessage message="Owner:" />{' '}
              <TouchableOpacity
                onPress={() => openGmail(details?.data?.user.email)}>
                <Text>
                  <CustomLink text={details?.data?.user.email} />
                </Text>
              </TouchableOpacity>
            </Text>
            <Text style={isAppDark ? styles.darkSpec : styles.spec}>
              Added AT : {formattedCreationDate}
            </Text>
            <Text style={isAppDark ? styles.darkSpec : styles.spec}>
              Updated AT : {formattedUpdateDate}
            </Text>
          </View>
          <View style={styles.mapContainer}>
            <MapScreen coordinates={[longitude, latitude]} />
          </View>
          {userIsCreator && (
            <>
              <Pressable
                style={
                  isAppDark
                    ? styles.darkButtonContainer
                    : styles.buttonContainer
                }
                onPress={handleEditNavigation}>
                <Text style={isAppDark ? styles.darkButton : styles.button}>
                  Edit Product
                </Text>
              </Pressable>
              <Pressable
                style={
                  isAppDark
                    ? styles.darkButtonContainer
                    : styles.buttonContainer
                }
                onPress={handleDeleteProduct}>
                <CustomErrorMessage message="Delete Product" />
              </Pressable>
            </>
          )}
          <TouchableOpacity
            style={
              isAppDark ? styles.darkButtonContainer : styles.buttonContainer
            }
            onPress={handleAddToCart}>
            <Text style={isAppDark ? styles.darkButton : styles.button}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;
