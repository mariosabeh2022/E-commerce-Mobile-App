import React, {useCallback, useState} from 'react';
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

export default function RootNavigator() {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const accessToken = useAuthStore(state => state.accessToken);
  const [loading, setLoading] = useState(true);
  const toggleOnFinish = useCallback(() => setLoading(false), []);
  return (
    <NavigationContainer theme={isAppDark ? DarkTheme : DefaultTheme}>
      {loading ? (
        <SplashScreen onFinish={toggleOnFinish} />
      ) : accessToken ? (
        <AuthenticatedStack />
      ) : (
        <UnauthenticatedStack />
      )}
    </NavigationContainer>
  );
}
