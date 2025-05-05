import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {data} from '../../assets/Products.json';
import {styles} from './productListings.style';
const ProductListingsScreen = () => {
  const renderItem = ({item}: {item: any}) => (
    <>
      <Text style={{fontSize:20}}>{Number(item._id)}</Text>
      <View style={styles.container}>
        <Image
          source={{uri: item.images[0].url}}
          style={{width: 100, height: 100, marginRight:10}}
        />
        <View style={{backgroundColor: 'lightblue', flex: 1}}>
          <Text style={styles.item}>{item.title}</Text>
          <Text style={styles.item}>{item.price}</Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
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
