// ProductsStack.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsScreen from '../../screens/productListings/productListings';
import DetailsScreen from '../../screens/detailsScreen/detailsScreen';
import CustomThemeButton from '../../components/atoms/customThemeButton/customThemeButton';
import {Pressable, Text} from 'react-native';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {ProductsStackParamList} from '../navigator/navigationTypes';

const Stack = createNativeStackNavigator<ProductsStackParamList>();

export default function ProductsStack() {
  const renderCustomThemeButton = () => <CustomThemeButton />;
  const renderShareButton = () => (
    <Pressable>
      <Text>
        <CustomIcon type="share-alt" />
      </Text>
    </Pressable>
  );
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: renderCustomThemeButton,
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: renderShareButton,
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
    </Stack.Navigator>
  );
}
