import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
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
// import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import {useQuery} from '@tanstack/react-query';
import {fetchProducts, searchProducts} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';
import CustomButton from '../../components/atoms/customButton/customButton';

type ProductScreenNavigationProp = NativeStackNavigationProp<
  ProductsStackParamList,
  'Products'
>;

// const renderCustomErrorMessage = () => (
//   <CustomErrorMessage message="No items available" />
// );

const ProductListingsScreen = () => {
  const userToken = useAuthStore(state => state.accessToken);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'price'>('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const toggleAlphaSort = () => {
    setSortBy('title');
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const togglePriceSort = () => {
    setSortBy('price');
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };
  const {
    data: responseData,
    isFetching: isFetchingAll,
    isRefetching: isRefetchingAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ['products', {sortBy, order}],
    queryFn: () =>
      fetchProducts({
        token: userToken!,
        sortBy,
        order,
      }),
    enabled: !!userToken,
  });

  const {
    data: filteredData,
    isFetching: isFetchingSearch,
    isRefetching: isRefetchingSeach,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ['search', {search}],
    queryFn: () =>
      searchProducts({
        token: userToken!,
        query: search,
      }),
    enabled: !!userToken && !!search,
  });
  const showSearchResults = search.length >= 2;
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
          <ScrollView horizontal={true} style={styles.scrollview}>
            <View style={styles.scrollViewItemContainer}>
              <Pressable onPress={toggleAlphaSort}>
                <CustomButton
                  text={`Name ${sortBy === 'title' ? order : ''}`}
                />
              </Pressable>
              <Pressable onPress={togglePriceSort}>
                <CustomButton
                  text={`Price ${sortBy === 'price' ? order : ''}`}
                />
              </Pressable>
            </View>
          </ScrollView>
        </CustomView>
        <CustomView>
          <>
            <CustomInput
              placeholder="Filter Item"
              value={search}
              onChangeText={setSearch}
              keyboardType="default"
            />
            <CustomPressable
              onPress={showSearchResults ? refetchSearch : refetchAll}>
              <CustomIcon type="search" />
            </CustomPressable>
          </>
        </CustomView>
        <FlatList
          data={showSearchResults ? filteredData?.data : responseData?.data}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) =>
            (showSearchResults ? isFetchingSearch : isFetchingAll) ||
            !responseData
              ? customSkeletonItem()
              : renderItem({item})
          }
          onRefresh={showSearchResults ? refetchSearch : refetchAll}
          refreshing={showSearchResults ? isRefetchingSeach : isRefetchingAll}
          ListEmptyComponent={customSkeletonItem}
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
