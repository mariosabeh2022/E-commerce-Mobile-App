import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsScreen from '../../screens/productListings/productListings';
import DetailsScreen from '../../screens/detailsScreen/detailsScreen';
import {Pressable, Text} from 'react-native';
import CustomShare from '../../components/atoms/customShare/customShare';
import {AuthenticatedStackParamList} from '../navigator/navigationTypes';

const Stack = createNativeStackNavigator<AuthenticatedStackParamList>();

export default function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable>
              <Text>
                <CustomShare type="share" />
              </Text>
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
