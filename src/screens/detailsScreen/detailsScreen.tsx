import React, {useRef, useEffect} from 'react';
import {styles} from './detailsScreen.style';
import {Animated, Text, View, Pressable} from 'react-native';
import {data} from '../../assets/Products.json';
import {RouteProp} from '@react-navigation/native';
import {ProductsStackParamList} from '../../navigation/navigator/navigationTypes';
import ImageCarousel from '../../components/molecules/customCarousel/customCarousel';
import {useTheme} from '../../contexts/themeContext';
type DetailsScreenRouteProp = RouteProp<ProductsStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen = ({route}: Props) => {
  const fetchedData = data.find(
    item => item._id.toString() === route.params.id,
  );
  const images = fetchedData?.images?.map(({_id, url}) => ({
    _id: _id,
    uri: url,
  }));
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  });
  return (
    <>
      <View style={isAppDark ? styles.darkContainer : styles.container}>
        <View style={styles.innerContainer}>
          <ImageCarousel images={images} />
        </View>
        <View style={styles.infos}>
          <Text style={isAppDark ? styles.darkTitle : styles.title}>
            {fetchedData?.title}
          </Text>
          <Text style={isAppDark ? styles.darkSpec : styles.spec}>
            Specifications
          </Text>
          <Text style={styles.desc}>{fetchedData?.description}</Text>
          <Text style={isAppDark ? styles.darkPrice : styles.price}>
            Price: {fetchedData?.price}$
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
