import React from 'react';
import {styles} from './detailsScreen.style';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {data} from '../../assets/Products.json';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import Icon from 'react-native-vector-icons/FontAwesome5';
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen = ({route}: Props) => {
  const fetchedData = data.find(
    item => item._id.toString() === route.params.id,
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={{uri: fetchedData?.images[0].url}}
            style={styles.image}
          />
        </View>
        <View style={styles.infos}>
          <Text style={styles.title}>{fetchedData?.title}</Text>
          <Text style={styles.desc}>{fetchedData?.description}</Text>
          <Text style={styles.price}>Price: {fetchedData?.price}$</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.share}>
        <Icon name="share" size={24} color="#000" />
      </TouchableOpacity>
    </>
  );
};

export default DetailsScreen;
