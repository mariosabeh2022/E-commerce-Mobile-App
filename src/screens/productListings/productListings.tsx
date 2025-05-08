import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {data} from '../../assets/Products.json';
import {styles} from './productListings.style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomRenderItem from '../../components/organismes/customRenderItem/customRenderItem';
const ProductListingsScreen = () => {
  type ProductScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Products'
  >;
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
  const theme = useColorScheme();
  return (
    <CustomContainer>
      <FlatList
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No products found.</Text>}
        ListHeaderComponent={
          <Text
            style={
              theme === 'dark' ? styles.darkHeaderComponent : styles.headerComponent
            }>
            Available Items
          </Text>
        }
        ListFooterComponent={
          <Text
            style={
              theme === 'dark' ? styles.darkFooterComponent : styles.footerComponent
            }>
            ---------------
          </Text>
        }
      />
    </CustomContainer>
  );
};
export default ProductListingsScreen;
