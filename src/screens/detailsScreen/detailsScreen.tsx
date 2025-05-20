import React, {useRef, useEffect, useCallback} from 'react';
import {styles} from './detailsScreen.style';
import {Animated, Text, View, Pressable} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ProductsStackParamList} from '../../navigation/navigator/navigationTypes';
import ImageCarousel from '../../components/molecules/customCarousel/customCarousel';
import {useTheme} from '../../contexts/themeContext';
import {useQuery} from '@tanstack/react-query';
import {productDetails} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
type DetailsScreenRouteProp = RouteProp<ProductsStackParamList, 'Details'>;

const DetailsScreen = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const {id: itemId} = route.params;
  const userToken = useAuthStore(state => state.accessToken);
  const {data} = useQuery({
    queryKey: ['fetchDetails'],
    queryFn: () =>
      productDetails({
        token: userToken!,
        id: itemId,
      }),
    enabled: !!userToken,
  });
  const images = data?.data?.images?.map(
    ({_id, url}: {_id: string; url: string}) => ({
      _id: _id,
      uri: url,
    }),
  );
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
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
  console.log(data);
  const creationDate = new Date(data?.data?.createdAt);
  const creationYear = creationDate.getFullYear();
  const cm = creationDate.getMonth() + 1;
  const creationMonth = cm < 10 ? '0' + cm : String(cm);
  const cd = creationDate.getDate();
  const creationDay = cd < 10 ? '0' + cd : String(cd);
  const formattedCreationDate = `${creationYear}-${creationMonth}-${creationDay}`;

  const updateDate = new Date(data?.data?.createdAt);
  const updateYear = updateDate.getFullYear();
  const um = creationDate.getMonth() + 1;
  const updateMonth = um < 10 ? '0' + um : String(um);
  const ud = creationDate.getDate();
  const updateDay = ud < 10 ? '0' + ud : String(ud);
  const formattedUpdateDate =
    `${updateYear}-${updateMonth}-${updateDay}` !== formattedCreationDate
      ? `${updateYear}-${updateMonth}-${updateDay}`
      : 'No updates yet';

  return (
    <>
      <View style={isAppDark ? styles.darkContainer : styles.container}>
        <View style={styles.innerContainer}>
          <ImageCarousel images={images || []} />
        </View>
        <View style={styles.infos}>
          <Text style={isAppDark ? styles.darkTitle : styles.title}>
            {data?.data?.title}
          </Text>
          <Text style={isAppDark ? styles.darkSpec : styles.spec}>
            Specifications
          </Text>
          <Text style={styles.desc}>{data?.data?.description}</Text>
          <Text style={isAppDark ? styles.darkPrice : styles.price}>
            Price: {data?.data?.price}$
          </Text>
          <Text style={isAppDark ? styles.darkSpec : styles.spec}>
            <CustomErrorMessage message="Product Owner:" />{' '}
            {data?.data?.user.email}
          </Text>
          <Text style={isAppDark ? styles.darkSpec : styles.spec}>
            Added AT : {formattedCreationDate}
          </Text>
          <Text style={isAppDark ? styles.darkSpec : styles.spec}>
            Updated AT : {formattedUpdateDate}
          </Text>
        </View>
        <Pressable
          style={
            isAppDark ? styles.darkButtonContainer : styles.buttonContainer
          }>
          <Text style={isAppDark ? styles.darkButton : styles.button}>
            Add To Cart
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default DetailsScreen;
