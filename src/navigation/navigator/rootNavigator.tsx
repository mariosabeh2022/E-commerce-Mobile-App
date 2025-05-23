import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import UnauthenticatedStack from '../stacks/unauthenticated';
import {useTheme} from '../../contexts/themeContext';
import SplashScreen from '../../screens/splashScreen/splashScreen';
import useAuthStore from '../../stores/authStore/authStore';
import AuthenticatedStack from '../stacks/authenticatedStack';
import NetInfo from '@react-native-community/netinfo';
import {Animated, Easing} from 'react-native';
import NoConnectionScreen from '../../screens/noConnectionScreen/noConnectionScreen';

export default function RootNavigator() {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const accessToken = useAuthStore(state => state.accessToken);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const progressValue = useRef(0);
  const checkConnection = useCallback(async () => {
    setConnectionError(false);
    progress.setValue(0);

    const interval = setInterval(() => {
      progressValue.current = Math.min(progressValue.current + 0.05, 1);
      progress.setValue(progressValue.current);
    }, 150);

    const state = await NetInfo.fetch();
    clearInterval(interval);

    Animated.timing(progress, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      if (state.isConnected) {
        setLoading(false);
      } else {
        setConnectionError(true);
      }
    });
  }, [progress]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  if (connectionError) {
    return <NoConnectionScreen onRetry={checkConnection} />;
  }

  if (loading) {
    return <SplashScreen progress={progress} />;
  }

  return (
    <NavigationContainer theme={isAppDark ? DarkTheme : DefaultTheme}>
      {accessToken ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}
