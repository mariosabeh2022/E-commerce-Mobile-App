import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {data} from '../../assets/Products.json';
import {styles} from './productListings.style';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
const ProductListingsScreen = () => {
type ProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Products'
>;
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const renderItem = ({item}: {item: any}) => (
    <View style={{margin: 3}}>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item._id.toString() })}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>{'Item ' + Number(item._id)}:</Text>
          </View>
          <View style={styles.innerContainer}>
            <Image
              source={{uri: item.images[0].url}}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.item}>Name: {item.title}</Text>
              <Text style={styles.item}>Price: {item.price}$</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{margin: 5, borderWidth: 3}}>
      <FlatList
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No products found.</Text>}
      />
    </View>
  );
};
export default ProductListingsScreen;
