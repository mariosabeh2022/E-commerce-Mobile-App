import React from 'react';
import CustomThemeButton from '../../components/atoms/customThemeButton/customThemeButton';
import CamPermissionsCheck from '../../screens/uploadScreen/camera';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthenticatedTabParamList} from '../navigator/navigationTypes';
import ProductsStack from './ProductsStack';
// import profileScreen from '../../screens/profileScreen/profileScreen';
const Tab = createBottomTabNavigator<AuthenticatedTabParamList>();

export default function AuthenticatedTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={{tabBarHideOnKeyboard: true}}>
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
          tabBarIcon: () => <CustomIcon type="plus" />,
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
          },
          headerRightContainerStyle: {
            padding: 16,
          },
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={profileScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: () => <CustomIcon type="user" />,
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
          },
          headerRightContainerStyle: {
            padding: 16,
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}
