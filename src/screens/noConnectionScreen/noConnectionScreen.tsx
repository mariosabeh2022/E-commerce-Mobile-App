import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from './noConnectionScreen.style';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomButton from '../../components/atoms/customButton/customButton';
import LottieView from 'lottie-react-native';

export default function NoConnectionScreen({onRetry}: {onRetry: () => void}) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/success_animation.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <CustomTitle text="Whoops!!" />
      <Text style={styles.subtitle}>
        No internet connection found. Please check your internet settings.
      </Text>
      <Pressable onPress={onRetry}>
        <CustomButton text="Reload" />
      </Pressable>
    </View>
  );
}
