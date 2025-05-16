import React, {useState, useEffect, useCallback} from 'react';
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
import CustomPressable from '../../components/molecules/customPressable/customPressable';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {useTheme} from '../../contexts/themeContext';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';

type ProductScreenNavigationProp = NativeStackNavigationProp<
  ProductsStackParamList,
  'Products'
>;

const renderCustomErrorMessage = () => (
  <CustomErrorMessage message="No items available" />
);

const ProductListingsScreen = () => {
  const [filteredText, setFilteredText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(data);
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const handleDetailsNavigation = ({item}: any) =>
    navigation.navigate('Details', {id: item._id.toString()});
  const renderItem = ({item}: {item: any}) => (
    <View>
      <TouchableOpacity onPress={handleDetailsNavigation}>
        <CustomRenderItem item={item} />
      </TouchableOpacity>
    </View>
  );
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';

  const filterData = useCallback(() => {
    if (filteredText.length >= 1) {
      return data.filter(item =>
        item.title.toLowerCase().includes(filteredText.toLowerCase()),
      );
    }
    return data;
  }, [filteredText]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      const result = filterData();
      setFilteredData(result);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [filterData]);

  const customSkeletonItem = () => {
    return (
      <View
        style={
          isAppDark ? skeletonStyles.darkContainer : skeletonStyles.container
        }>
        <View style={skeletonStyles.innerContainer}>
          <View style={skeletonStyles.image} />
          <View style={skeletonStyles.infoContainer}>
            <View style={skeletonStyles.item}>
              <View style={skeletonStyles.textLine} />
            </View>
            <View style={skeletonStyles.price}>
              <View style={skeletonStyles.textLineShort} />
            </View>
            <View style={skeletonStyles.item}>
              <View style={skeletonStyles.textLine} />
            </View>
            <View style={skeletonStyles.price}>
              <View style={skeletonStyles.textLineShort} />
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
              value={filteredText}
              onChangeText={setFilteredText}
              keyboardType="default"
            />
            <CustomPressable>
              <CustomIcon type="search" />
            </CustomPressable>
          </>
        </CustomView>
        <FlatList
          data={filteredText ? filteredData : data}
          keyExtractor={item => item._id.toString()}
          renderItem={isLoading ? customSkeletonItem : renderItem}
          ListEmptyComponent={renderCustomErrorMessage}
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
          extraData={isLoading}
        />
      </>
    </CustomContainer>
  );
};
export default ProductListingsScreen;
