import React from 'react';

import LoginScreen from './src/screens/login/loginScreen';
import SignUpScreen from './src/screens/sign-up/sign-upScreen';
import ProductsScreen from './src/screens/productListings/productListings';
import DetailsScreen from './src/screens/detailsScreen/detailsScreen';
import VerificationScreen from './src/screens/verification/verification';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableOpacity, useColorScheme} from 'react-native';
import {AuthProvider} from './src/contexts/authContext';
import CustomShare from './src/components/atoms/customShare/customShare';
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity>
              <Text>
                <CustomShare type="share" />,
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function App(): React.JSX.Element {
  const theme = useColorScheme();
  return (
    <AuthProvider>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootStack />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  Products: undefined;
  Details: {id: string};
  Verification: undefined;
};
