import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/home/homeScreen';
import LoginScreen from '../../screens/login/loginScreen';
import SignUpScreen from '../../screens/sign-up/sign-upScreen';
import VerificationScreen from '../../screens/verification/verification';
import CustomThemeButton from '../../components/atoms/customThemeButton/customThemeButton';
import {UnauthenticatedStackParamList} from 'navigation/navigator/navigationTypes';
import ForgotPasswordScreen from '../../screens/forgotPassword/forgotPassword';

const Stack = createNativeStackNavigator<UnauthenticatedStackParamList>();

export default function UnauthenticatedStack() {
  const renderCustomThemeButton = () => <CustomThemeButton />;
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'flip',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
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
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPasswordScreen}
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
