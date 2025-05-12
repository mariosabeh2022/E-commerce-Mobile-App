import React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
// import AuthenticatedStack from '../stacks/authenticated';
import UnauthenticatedStack from '../stacks/unauthenticated';
import {useAuth} from '../../contexts/authContext';
import {useTheme} from '../../contexts/themeContext';
import AuthenticatedTabs from '../stacks/authenticatedTabs';

export default function RootNavigator() {
  const {user, verified} = useAuth();
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <NavigationContainer theme={isAppDark ? DarkTheme : DefaultTheme}>
      {user && verified ? <AuthenticatedTabs /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}
