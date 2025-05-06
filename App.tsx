import React from 'react';

import LoginScreen from './src/screens/login/loginScreen';
import SignUpScreen from './src/screens/sign-up/sign-upScreen';
import ProductsScreen from './src/screens/productListings/productListings';
import DetailsScreen from './src/screens/detailsScreen/detailsScreen';
import {ThemeProvider} from './src/styles/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
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
  Products: undefined;
  Details: { id: string };
};
