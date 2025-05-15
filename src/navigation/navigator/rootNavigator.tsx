import React, {useState} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import UnauthenticatedStack from '../stacks/unauthenticated';
import {useAuth} from '../../contexts/authContext';
import {useTheme} from '../../contexts/themeContext';
import AuthenticatedTabs from '../stacks/authenticatedTabs';
import SplashScreen from '../../screens/splashScreen/splashScreen';

export default function RootNavigator() {
  const {user, verified} = useAuth();
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [loading, setLoading] = useState(true);
  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }
  return (
    <NavigationContainer theme={isAppDark ? DarkTheme : DefaultTheme}>
      {user && verified ? <AuthenticatedTabs /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}
