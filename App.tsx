import React from 'react';

import LoginScreen from './src/screens/login/loginScreen';
import SignUpScreen from './src/screens/sign-up/sign-upScreen';
import ProductsScreen from './src/screens/productListings/productListings';
import DetailsScreen from './src/screens/detailsScreen/detailsScreen';
import VerificationScreen from './src/screens/verification/verification';
import {ThemeProvider} from './src/styles/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {style} from './src/styles/Icons';
import {AuthProvider} from './src/contexts/authContext';
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerTitleAlign:'center'}}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerTitleAlign:'center'}}/>
      <Stack.Screen name="Verification" component={VerificationScreen} options={{headerTitleAlign:'center'}}/>
      <Stack.Screen name="Products" component={ProductsScreen} options={{headerTitleAlign:'center'}}/>
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity style={style.container}>
              <Icon name="share" style={style.shareIcon} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <NavigationContainer>
        <ThemeProvider>
          <RootStack />
        </ThemeProvider>
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
