import React from 'react';

import LoginScreen from './src/screens/login/loginScreen';
import SignUpScreen from './src/screens/sign-up/sign-upScreen';
import {ThemeProvider} from './src/styles/ThemeContext';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
};