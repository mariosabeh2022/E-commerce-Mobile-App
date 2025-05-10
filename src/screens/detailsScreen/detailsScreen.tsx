import React, {useRef, useEffect} from 'react';
import {styles} from './detailsScreen.style';
import {Animated, Text, View, useColorScheme, Pressable} from 'react-native';
import {data} from '../../assets/Products.json';
import {RouteProp} from '@react-navigation/native';
import {AuthenticatedStackParamList} from '../../navigation/navigator/navigationTypes';
type DetailsScreenRouteProp = RouteProp<AuthenticatedStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen = ({route}: Props) => {
  const fetchedData = data.find(
    item => item._id.toString() === route.params.id,
  );
  const theme = useColorScheme();
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
      <View style={theme === 'dark' ? styles.darkContainer : styles.container}>
        <View style={styles.innerContainer}>
          <Animated.Image
            source={{uri: fetchedData?.images[0].url}}
            style={[styles.image, {opacity: fadeAnim}]}
          />
        </View>
        <View style={styles.infos}>
          <Text style={theme === 'dark' ? styles.darkTitle : styles.title}>
            {fetchedData?.title}
          </Text>
          <Text style={theme === 'dark' ? styles.darkSpec : styles.spec}>
            Specifications
          </Text>
          <Text style={styles.desc}>{fetchedData?.description}</Text>
          <Text style={theme === 'dark' ? styles.darkPrice : styles.price}>
            Price: {fetchedData?.price}$
          </Text>
        </View>
        <Pressable
          style={
            theme === 'dark'
              ? styles.darkButtonContainer
              : styles.buttonContainer
          }>
          <Text style={theme === 'dark' ? styles.darkButton : styles.button}>
            Add To Cart
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default DetailsScreen;
