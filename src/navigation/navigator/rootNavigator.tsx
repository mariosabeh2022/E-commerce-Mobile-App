import React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import AuthenticatedStack from '../stacks/authenticated';
import UnauthenticatedStack from '../stacks/unauthenticated';
import {useAuth} from '../../contexts/authContext';

export default function RootNavigator() {
  const {user, verified} = useAuth();
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user && verified ? <AuthenticatedStack /> : <UnauthenticatedStack />}
    </NavigationContainer>
  );
}
