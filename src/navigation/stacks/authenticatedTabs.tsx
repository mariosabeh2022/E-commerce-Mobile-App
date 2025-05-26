import React, {useCallback, useEffect} from 'react';
import CustomThemeButton from '../../components/atoms/customThemeButton/customThemeButton';
import CreateProduct from '../../screens/createProduct/createProduct';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthenticatedTabParamList} from '../navigator/navigationTypes';
import ProductsStack from './ProductsStack';
import {useTheme} from '../../contexts/themeContext';
import {Image, View} from 'react-native';
import styles from '../../styles/tabAcitve.style';
import ProfileScreen from '../../screens/profileScreen/profileScreen';
import CartScreen from '../../screens/cartScreen/cartScreen';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
import useUserStore from '../../stores/profileStore/profileStore';
import {customProfileIcon} from './authenticatedTabs.style';
import useCartStore from '../../stores/cartStore/cartStore';
type TabBarIconProps = {
  focused: boolean;
};

const Tab = createBottomTabNavigator<AuthenticatedTabParamList>();
export default function AuthenticatedTabs() {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const user = useUserStore(state => state.user);
  const userHasImage = Boolean(user?.profileImage);
  const products = useCartStore(state => state.products);
  const productsCount = products.length;
  const renderCustomThemeButton = () => <CustomThemeButton />;
  const setUser = useUserStore(state => state.setUser);
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);
  const renderDevicesIcon = useCallback(
    ({focused}: TabBarIconProps) => (
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
    [isAppDark],
  );
  const renderUploadIcon = useCallback(
    ({focused}: TabBarIconProps) => (
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
    [isAppDark],
  );
  const renderShoppingIcon = useCallback(
    ({focused}: TabBarIconProps) => (
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
    [isAppDark],
  );
  const renderProfileIcon = useCallback(
    ({focused}: TabBarIconProps) => (
      <View
        style={
          focused
            ? isAppDark
              ? styles.darkActive
              : styles.active
            : styles.inactive
        }>
        {userHasImage ? (
          <Image
            source={{
              uri: user.profileImage,
            }}
            style={customProfileIcon.imageIcon}
            resizeMode="contain"
          />
        ) : (
          <CustomIcon type="user" />
        )}
      </View>
    ),
    [isAppDark, userHasImage, user?.profileImage],
  );
  return (
    <Tab.Navigator
      initialRouteName="Devices"
      screenOptions={{tabBarHideOnKeyboard: true}}>
      <Tab.Screen
        name="Devices"
        component={ProductsStack}
        options={{
          headerShown: false,
          tabBarIcon: renderDevicesIcon,
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
            color: isAppDark ? darkBaseColor : lightBaseColor,
          },
          headerTitleStyle: {
            fontFamily: 'Sansation-BoldItalic',
          },
        }}
      />
      <Tab.Screen
        name="Create Product"
        component={CreateProduct}
        options={{
          headerTitleAlign: 'center',
          headerRight: renderCustomThemeButton,
          tabBarIcon: renderUploadIcon,
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
            color: isAppDark ? darkBaseColor : lightBaseColor,
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
          headerRight: renderCustomThemeButton,
          tabBarIcon: renderShoppingIcon,
          tabBarBadge: productsCount > 0 ? productsCount : 0,
          tabBarBadgeStyle: {
            backgroundColor: isAppDark ? 'black' : 'white',
            color: isAppDark ? lightBaseColor : darkBaseColor,
            fontFamily: 'Sansation-Bold',
          },
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
            color: isAppDark ? darkBaseColor : lightBaseColor,
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
          headerRight: renderCustomThemeButton,
          tabBarIcon: renderProfileIcon,
          tabBarLabelStyle: {
            fontFamily: 'Sansation-Bold',
            color: isAppDark ? darkBaseColor : lightBaseColor,
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
