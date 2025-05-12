import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {data} from '../../assets/Products.json';
import {styles} from './productListings.style';
import {skeletonStyles} from '../../components/organismes/customSkeletonItem/customSkeletonItem.style';
import {ProductsStackParamList} from '../../navigation/navigator/navigationTypes';

import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomRenderItem from '../../components/organismes/customRenderItem/customRenderItem';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomView from '../../components/molecules/customView/customView';
import CustomTouchable from '../../components/molecules/customTouchable/customTouchable';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {useTheme} from '../../contexts/themeContext';

type ProductScreenNavigationProp = NativeStackNavigationProp<
  ProductsStackParamList,
  'ProductsStack'
>;
const ProductListingsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const renderItem = ({item}: {item: any}) => (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {id: item._id.toString()})
        }>
        <CustomRenderItem item={item} />
      </TouchableOpacity>
    </View>
  );
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  });
  const cutomSkeletonItem = () => {
    return (
      <View
        style={
          isAppDark ? skeletonStyles.darkContainer : skeletonStyles.container
        }>
        <View style={skeletonStyles.innerContainer}>
          <View style={skeletonStyles.image} />
          <View style={skeletonStyles.infoContainer}>
            <View style={skeletonStyles.item}>
              <View style={skeletonStyles.textLine}></View>
            </View>
            <View style={skeletonStyles.price}>
              <View style={skeletonStyles.textLineShort}></View>
            </View>
            <View style={skeletonStyles.item}>
              <View style={skeletonStyles.textLine}></View>
            </View>
            <View style={skeletonStyles.price}>
              <View style={skeletonStyles.textLineShort}></View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <CustomContainer>
      <>
        <CustomView>
          <>
            <CustomInput
              placeholder="Filter Item"
              value={''}
              onChangeText={() => {}}
              keyboardType="default"
            />
            <CustomTouchable onPress={() => {}}>
              <CustomIcon type="search" />
            </CustomTouchable>
          </>
        </CustomView>
        <FlatList
          data={data}
          keyExtractor={item => item._id.toString()}
          renderItem={isLoading ? cutomSkeletonItem : renderItem}
          ListEmptyComponent={<Text>No products found.</Text>}
          ListHeaderComponent={
            <Text
              style={
                isAppDark ? styles.darkHeaderComponent : styles.headerComponent
              }>
              Available Items
            </Text>
          }
          ListFooterComponent={
            <Text
              style={
                isAppDark ? styles.darkFooterComponent : styles.footerComponent
              }>
              ---------------
            </Text>
          }
        />
      </>
    </CustomContainer>
  );
};
export default ProductListingsScreen;
