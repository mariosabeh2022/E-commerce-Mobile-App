import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomenScreen from '../../screens/home/homeScreen';
import LoginScreen from '../../screens/login/loginScreen';
import SignUpScreen from '../../screens/sign-up/sign-upScreen';
import VerificationScreen from '../../screens/verification/verification';

const Stack = createNativeStackNavigator();

export default function UnauthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomenScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
}
