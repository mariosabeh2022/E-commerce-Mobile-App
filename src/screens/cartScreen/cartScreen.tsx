import React, {useCallback, useEffect} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {styles} from './cartScreen.style';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import useCartStore from '../../stores/cartStore/cartStore';
import {useTheme} from '../../contexts/themeContext';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomCartRenderItem from '../../components/organismes/customCartRenderItem/customCartRenderItem';
import CustomButton from '../../components/atoms/customButton/customButton';
import crashlytics from '@react-native-firebase/crashlytics';

const CartScreen = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const products = useCartStore(state => state.products);

  const totalPrice = products.reduce((sum, item) => {
    return sum + item.count * item.price;
  }, 0);

  const renderItem = useCallback(({item}: {item: any}) => {
    return <CustomCartRenderItem item={item} />;
  }, []);

  useEffect(() => {
    const initCrashlytics = async () => {
      try {
        await crashlytics().setCrashlyticsCollectionEnabled(true);
        crashlytics().setUserId('12345');
        crashlytics().setAttribute('userRole', 'tester');
        crashlytics().log('Crashlytics manually initialized');
      } catch (error) {
        console.log('Crashlytics init error', error);
      }
    };

    initCrashlytics();
  }, []);

  const triggerCrash = () => {
    crashlytics().log('Crash test initiated from TS app');
    crashlytics().crash();
  };

  return (
    <View style={isAppDark ? styles.darkContainer : styles.container}>
      <CustomTitle text="Your Items" />
      <FlatList
        data={products.filter(p => p && p._id)}
        keyExtractor={item => item._id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <CustomErrorMessage message="Your cart is empty." />
        }
      />
      <View
        style={isAppDark ? styles.darkTotalContainer : styles.totalContainer}>
        <Text style={isAppDark ? styles.darkTotal : styles.total}>
          TOTAL CHECKOUT:
        </Text>
        <Text style={isAppDark ? styles.darkRightTotal : styles.rightTotal}>
          {totalPrice} $
        </Text>
      </View>
      <Pressable onPress={triggerCrash}>
        <CustomButton text="Checkout" />
      </Pressable>
    </View>
  );
};

export default CartScreen;
