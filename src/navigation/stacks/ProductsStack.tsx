import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsScreen from '../../screens/productListings/productListings';
import DetailsScreen from '../../screens/detailsScreen/detailsScreen';
import CustomThemeButton from '../../components/atoms/customThemeButton/customThemeButton';
import {ProductsStackParamList} from '../navigator/navigationTypes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import EditProduct from '../../screens/editProduct/editProduct';

const Stack = createNativeStackNavigator<ProductsStackParamList>();
const queryClient = new QueryClient();
export default function ProductsStack() {
  const renderCustomThemeButton = () => <CustomThemeButton />;

  return (
    <QueryClientProvider client={queryClient}>
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

            headerTitleStyle: {
              fontFamily: 'Sansation-BoldItalic',
            },
          }}
        />
        <Stack.Screen
          name="Edit Product"
          component={EditProduct}
          options={{
            headerTitleAlign: 'center',

            headerTitleStyle: {
              fontFamily: 'Sansation-BoldItalic',
            },
          }}
        />
      </Stack.Navigator>
    </QueryClientProvider>
  );
}
