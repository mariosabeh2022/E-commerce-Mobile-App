import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';
import {styles} from './cartScreen.style';
import CustomTitle from '../../components/atoms/customTitle/customTitle';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <CustomTitle text="Coming Soon" />
      <LottieView
        source={require('../../assets/animations/coming_soon_animation_.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

export default CartScreen;
