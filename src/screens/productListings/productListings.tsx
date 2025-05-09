import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {data} from '../../assets/Products.json';
import {styles} from './productListings.style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { AuthenticatedStackParamList } from '../../navigation/navigator/navigationTypes';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomRenderItem from '../../components/organismes/customRenderItem/customRenderItem';
type ProductScreenNavigationProp = NativeStackNavigationProp<
  AuthenticatedStackParamList,
  'Products'
>;
const ProductListingsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const renderItem = ({item}: {item: any}) => (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate('Details', {id: item._id.toString()})
        }>
        <CustomRenderItem item={item} />
      </Pressable>
    </View>
  );
  const theme = useColorScheme();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);
  const renderSkeletonItem = () => (
    <View
      style={theme === 'dark' ? styles.darkSkeletonItem : styles.skeletonItem}
    />
  );
  return (
    <CustomContainer>
      <FlatList
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={isLoading ? renderSkeletonItem : renderItem}
        ListEmptyComponent={<Text>No products found.</Text>}
        ListHeaderComponent={
          <Text
            style={
              theme === 'dark'
                ? styles.darkHeaderComponent
                : styles.headerComponent
            }>
            Available Items
          </Text>
        }
        ListFooterComponent={
          <Text
            style={
              theme === 'dark'
                ? styles.darkFooterComponent
                : styles.footerComponent
            }>
            ---------------
          </Text>
        }
      />
    </CustomContainer>
  );
};
export default ProductListingsScreen;
