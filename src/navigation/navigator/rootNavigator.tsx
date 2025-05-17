import React, {useCallback, useState} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import UnauthenticatedStack from '../stacks/unauthenticated';
import {useTheme} from '../../contexts/themeContext';
import AuthenticatedTabs from '../stacks/authenticatedTabs';
import SplashScreen from '../../screens/splashScreen/splashScreen';
import useAuthStore from '../../stores/authStore/authStore';

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
        <AuthenticatedTabs />
      ) : (
        <UnauthenticatedStack />
      )}
    </NavigationContainer>
  );
}
