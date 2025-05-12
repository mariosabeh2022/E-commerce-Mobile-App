import React from 'react';
import CustomThemeButton from '../../components/atoms/customThemeButton/customThemeButton';
import CamPermissionsCheck from '../../screens/uploadScreen/camera';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthenticatedTabParamList} from '../navigator/navigationTypes';
import ProductsStack from './ProductsStack';
const Tab = createBottomTabNavigator<AuthenticatedTabParamList>();

export default function AuthenticatedTabs() {
  return (
    <Tab.Navigator initialRouteName="Devices" screenOptions={{tabBarHideOnKeyboard:true}}>
      <Tab.Screen
        name="Devices"
        component={ProductsStack}
        options={{
          headerShown: false,
          tabBarIcon: () => <CustomIcon type="mobile" />,
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
          },
        }}
      />
      <Tab.Screen
        name="Upload"
        component={CamPermissionsCheck}
        options={{
          headerTitleAlign: 'center',
          headerRight: () => <CustomThemeButton />,
          tabBarIcon: () => <CustomIcon type="camera" />,
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}
