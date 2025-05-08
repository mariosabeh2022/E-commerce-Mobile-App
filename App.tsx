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
import {useColorScheme} from 'react-native';
import CustomIcon from './src/components/atoms/customIcon/customIcon';
import {AuthProvider} from './src/contexts/authContext';
import CustomTouchable from './src/components/molecules/customTouchable/customTouchable';
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
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
            <CustomTouchable onPress={() => {}}>
              <CustomIcon type="share" />
            </CustomTouchable>
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
