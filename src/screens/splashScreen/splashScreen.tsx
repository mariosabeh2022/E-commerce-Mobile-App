import React, {useMemo} from 'react';
import {View, ActivityIndicator, Animated} from 'react-native';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import {styles} from './splashScreen.style';
import {SplashScreenProps} from './splashScreen.type';
import {useTheme} from '../../contexts/themeContext';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';

export default function SplashScreen({progress}: SplashScreenProps) {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';

  const animatedWidth = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      }),
    [progress],
  );

  return (
    <View style={styles.container}>
      <CustomTitle text="SHOPFINITY" />
      <View style={styles.innercontainer}>
        <CustomTitle text="Checking Connection Validity" />
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
