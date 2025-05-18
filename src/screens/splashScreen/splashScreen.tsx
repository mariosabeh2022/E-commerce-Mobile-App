import React, {useEffect, useMemo, useRef} from 'react';
import {View, ActivityIndicator, Animated, Easing} from 'react-native';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import {styles} from './splashScreen.style';
import {SplashScreenProps} from './splashScreen.type';
import {useTheme} from '../../contexts/themeContext';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';

export default function SplashScreen({onFinish}: SplashScreenProps) {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(onFinish);
  }, [progress, onFinish]);

  const animatedWidth = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: ['0%', '25%', '50%', '75%', '100%'],
      }),
    [progress],
  );

  return (
    <View style={styles.container}>
      <CustomTitle text="SHOPFINITY" />
      <View style={styles.innercontainer}>
        <ActivityIndicator
          size="large"
          color={isAppDark ? darkBaseColor : lightBaseColor}
        />
      </View>
      <View style={styles.meterBackground}>
        <Animated.View style={[styles.meterFill, {width: animatedWidth}]} />
      </View>
    </View>
  );
}
