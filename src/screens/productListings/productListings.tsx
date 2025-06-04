import React, {useCallback, useEffect, useState} from 'react';
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
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import useAuthStore from '../../stores/authStore/authStore';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomSkeletonItem from '../../components/organismes/customSkeletonItem/customSeketonItem';
import {fetchProducts} from '../../api/fetchProducts/fetchProductsCall';
import {searchProducts} from '../../api/fetchProducts/searchProductsCall';
type ProductScreenNavigationProp = NativeStackNavigationProp<
  ProductsStackParamList,
  'Products'
>;
type ProductScreenRouteProp = RouteProp<ProductsStackParamList, 'Products'>;

const ProductListingsScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const userToken = useAuthStore(state => state.accessToken);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'title' | 'price'>('title');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const toggleAlphaSort = useCallback(() => {
    setSortBy('title');
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  const togglePriceSort = useCallback(() => {
    setSortBy('price');
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);
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
    initialPageParam: 1,
    queryFn: ({pageParam}) =>
      fetchProducts({
        token: userToken!,
        page: pageParam,
        sortBy,
        order,
      }),
    getNextPageParam: lastPage => {
      if (!lastPage?.pagination) {
        return undefined;
      }
      const currentPage = lastPage.pagination.currentPage;
      const totalPages = lastPage.pagination.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!userToken,
  });
  const flatData = responseData?.pages?.flatMap(page => page.data) ?? [];
  const deduplicatedFlatData = Array.from(
    new Map(
      flatData.filter(item => item && item._id).map(item => [item._id, item]),
    ).values(),
  );
  const {
    data: filteredData,
    isFetching: isFetchingSearch,
    isRefetching: isRefetchingSearch,
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

  const showSearchResults = search.length > 2;
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
        refetchAll();
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
        {(isFetchingAll && !responseData?.pages?.length) || isFetchingSearch ? (
          <View style={styles.emptyListContainer}>
            <Text
              style={
                isAppDark ? styles.darkHeaderComponent : styles.headerComponent
              }>
              Available Items
            </Text>
            {[...Array(3)].map((_, index) => (
              <CustomSkeletonItem key={`skeleton-${index}`} />
            ))}
          </View>
        ) : (
          <FlatList
            data={
              showSearchResults && Array.isArray(filteredData?.data)
                ? filteredData.data
                : deduplicatedFlatData
            }
            keyExtractor={(item, index) => {
              if (item?._id) {
                return item._id.toString();
              }
              return `fallback-${index}`;
            }}
            renderItem={({item}) => {
              if (!item || !item._id) {
                return null;
              }
              return renderItem({item});
            }}
            onRefresh={showSearchResults ? refetchSearch : refetchAll}
            refreshing={
              showSearchResults ? isRefetchingSearch : isRefetchingAll
            }
            onEndReached={() => {
              if (!showSearchResults && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.7}
            ListEmptyComponent={
              showSearchResults ? (
                !isFetchingAll && search.length >= 3 ? (
                  CustomErrorMessage
                ) : (
                  <View style={styles.emptyListContainer}>
                    {[...Array(3)].map((_, index) => (
                      <CustomSkeletonItem key={`empty-skeleton-${index}`} />
                    ))}
                  </View>
                )
              ) : (
                <View style={styles.emptyListContainer}>
                  {[...Array(3)].map((_, index) => (
                    <CustomSkeletonItem key={`empty-skeleton-${index}`} />
                  ))}
                </View>
              )
            }
            ListHeaderComponent={
              <Text
                style={
                  isAppDark
                    ? styles.darkHeaderComponent
                    : styles.headerComponent
                }>
                Available Items
              </Text>
            }
            ListFooterComponent={
              isFetchingAll && !responseData ? (
                <Text
                  style={
                    isAppDark
                      ? styles.darkFooterComponent
                      : styles.footerComponent
                  }>
                  ---------------
                </Text>
              ) : null
            }
          />
        )}
      </>
    </CustomContainer>
  );
};
export default ProductListingsScreen;
