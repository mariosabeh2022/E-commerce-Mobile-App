import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import {useQuery} from '@tanstack/react-query';
import {fetchProducts} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';

type ProductScreenNavigationProp = NativeStackNavigationProp<
  ProductsStackParamList,
  'Products'
>;

type ProductImage = {
  url: string;
  _id: string;
};

type Products = {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: ProductImage[];
};

const renderCustomErrorMessage = () => (
  <CustomErrorMessage message="No items available" />
);

const ProductListingsScreen = () => {
  const userToken = useAuthStore(state => state.accessToken);
  const [filteredText, setFilteredText] = useState('');
  const {data: responseData, isLoading} = useQuery<{
    success: boolean;
    data: Products[];
    pagination: any;
  }>({
    queryKey: ['products'],
    queryFn: () => fetchProducts({token: userToken!}),
    enabled: !!userToken,
  });
  console.log(responseData);
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const renderItem = ({item}: {item: any}) => {
    const handleDetailsNavigation = () =>
      navigation.navigate('Details', {id: item._id.toString()});
    return (
      <View>
        <TouchableOpacity onPress={handleDetailsNavigation}>
          <CustomRenderItem item={item} />
        </TouchableOpacity>
      </View>
    );
  };
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';

  // const filterData = useCallback(() => {
  //   if (filteredText.length >= 1) {
  //     return data.filter(item =>
  //       item.title.toLowerCase().includes(filteredText.toLowerCase()),
  //     );
  //   }
  //   return data;
  // }, [filteredText]);
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
          data={responseData?.data}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) =>
            isLoading ? customSkeletonItem() : renderItem({item})
          }
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
        />
      </>
    </CustomContainer>
  );
};
export default ProductListingsScreen;
