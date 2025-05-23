import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './productListings.style';
import {ProductsStackParamList} from '../../navigation/navigator/navigationTypes';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomRenderItem from '../../components/organismes/customRenderItem/customRenderItem';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomView from '../../components/molecules/customView/customView';
import CustomPressable from '../../components/molecules/customPressable/customPressable';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {useTheme} from '../../contexts/themeContext';
// import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {fetchProducts, searchProducts} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomSkeletonItem from '../../components/organismes/customSkeletonItem/customSeketonItem';
type ProductScreenNavigationProp = NativeStackNavigationProp<
  ProductsStackParamList,
  'Products'
>;
type ProductScreenRouteProp = RouteProp<ProductsStackParamList, 'Products'>;

// const renderCustomErrorMessage = () => (
//   <CustomErrorMessage message="No items available" />
// );

const ProductListingsScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
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
    fetchNextPage,
    hasNextPage,
    isFetching: isFetchingAll,
    isFetchingNextPage,
    isRefetching: isRefetchingAll,
    refetch: refetchAll,
  } = useInfiniteQuery({
    queryKey: ['products', {sortBy, order}],
    queryFn: ({pageParam = 1}) =>
      fetchProducts({
        token: userToken!,
        page: pageParam,
        sortBy,
        order,
      }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage || !lastPage.pagination) {
        return undefined;
      }

      const {currentPage, totalPages} = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!userToken,
  });
  const flatData = responseData?.pages.flatMap(page => page.data) ?? [];
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (
        route.params?.fromScreen === 'Edit Product' ||
        route.params?.fromScreen === 'Details'
      ) {
        setSearch('');
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

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
          data={showSearchResults ? filteredData?.data : flatData}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) =>
            (showSearchResults ? isFetchingSearch : isFetchingAll) ||
            !responseData ? (
              <CustomSkeletonItem />
            ) : (
              renderItem({item})
            )
          }
          onRefresh={showSearchResults ? refetchSearch : refetchAll}
          refreshing={showSearchResults ? isRefetchingSeach : isRefetchingAll}
          onEndReached={() => {
            if (!showSearchResults && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.7}
          ListEmptyComponent={
            !isFetchingAll && flatData.length === 0
              ? CustomErrorMessage
              : CustomSkeletonItem
          }
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
