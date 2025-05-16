import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomenScreen from '../../screens/home/homeScreen';
import LoginScreen from '../../screens/login/loginScreen';
import SignUpScreen from '../../screens/sign-up/sign-upScreen';
import VerificationScreen from '../../screens/verification/verification';
import CustomThemeButton from '../../components/atoms/customThemeButton/customThemeButton';

const Stack = createNativeStackNavigator();

export default function UnauthenticatedStack() {
  const renderCustomThemeButton = () => <CustomThemeButton />;
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomenScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: renderCustomThemeButton,
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: renderCustomThemeButton,
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: renderCustomThemeButton,
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: renderCustomThemeButton,
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
    </Stack.Navigator>
  );
}
