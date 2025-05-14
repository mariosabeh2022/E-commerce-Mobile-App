import React from 'react';
import CustomThemeButton from '../../components/atoms/customThemeButton/customThemeButton';
import CamPermissionsCheck from '../../screens/uploadScreen/camera';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthenticatedTabParamList} from '../navigator/navigationTypes';
import ProductsStack from './ProductsStack';
import {useTheme} from '../../contexts/themeContext';
import {View} from 'react-native';
import styles from '../../styles/tabAcitve.style';
import ProfileScreen from '../../screens/profileScreen/profileScreen';
import CartScreen from '../../screens/cartScreen/cartScreen';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
const Tab = createBottomTabNavigator<AuthenticatedTabParamList>();
export default function AuthenticatedTabs() {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={{tabBarHideOnKeyboard: true}}>
      <Tab.Screen
        name="Devices"
        component={ProductsStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? isAppDark
                    ? styles.darkActive
                    : styles.active
                  : styles.inactive
              }>
              <CustomIcon type="mobile" />
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
          },
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
      <Tab.Screen
        name="Upload"
        component={CamPermissionsCheck}
        options={{
          headerTitleAlign: 'center',
          headerRight: () => <CustomThemeButton />,
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? isAppDark
                    ? styles.darkActive
                    : styles.active
                  : styles.inactive
              }>
              <CustomIcon type="plus" />
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
          },
          headerRightContainerStyle: {
            padding: 16,
          },
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: () => <CustomThemeButton />,
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? isAppDark
                    ? styles.darkActive
                    : styles.active
                  : styles.inactive
              }>
              <CustomIcon type="shopping-cart" />
            </View>
          ),
          tabBarBadge: '0',
          tabBarBadgeStyle: {
            backgroundColor: isAppDark ? 'black' : 'white',
            color: isAppDark ? lightBaseColor : darkBaseColor,
            fontFamily: 'Sansation-Bold',
          },
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
          },
          headerRightContainerStyle: {
            padding: 16,
          },
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: 'center',
          headerRight: () => <CustomThemeButton />,
          tabBarIcon: ({focused}) => (
            <View
              style={
                focused
                  ? isAppDark
                    ? styles.darkActive
                    : styles.active
                  : styles.inactive
              }>
              <CustomIcon type="user" />
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
          },
          headerRightContainerStyle: {
            padding: 16,
          },
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
    </Tab.Navigator>
  );
}
