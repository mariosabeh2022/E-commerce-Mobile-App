import React, {useCallback} from 'react';
import {FlatList, Text, View} from 'react-native';
import {styles} from './cartScreen.style';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import useCartStore from '../../stores/cartStore/cartStore';
import {useTheme} from '../../contexts/themeContext';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomCartRenderItem from '../../components/organismes/customCartRenderItem/customCartRenderItem';
import CustomButton from '../../components/atoms/customButton/customButton';

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
      <CustomButton text="Checkout" />
    </View>
  );
};

export default CartScreen;
