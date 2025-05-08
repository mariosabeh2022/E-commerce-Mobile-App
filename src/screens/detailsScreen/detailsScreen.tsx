import React from 'react';
import {styles} from './detailsScreen.style';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {data} from '../../assets/Products.json';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen = ({route}: Props) => {
  const fetchedData = data.find(
    item => item._id.toString() === route.params.id,
  );
  const theme = useColorScheme();
  return (
    <>
      <View style={theme === 'dark' ? styles.darkContainer : styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={{uri: fetchedData?.images[0].url}}
            style={styles.image}
          />
        </View>
        <View style={styles.infos}>
          <Text style={theme === 'dark' ? styles.darkTitle : styles.title}>
            {fetchedData?.title}
          </Text>
          <Text style={theme === 'dark' ? styles.darkTitle : styles.title}>
            About
          </Text>
          <Text style={styles.desc}>{fetchedData?.description}</Text>
          <Text style={theme === 'dark' ? styles.darkPrice : styles.price}>
            Price: {fetchedData?.price}$
          </Text>
        </View>
        <TouchableOpacity
          style={
            theme === 'dark'
              ? styles.darkButtonContainer
              : styles.buttonContainer
          }>
          <Text style={theme === 'dark' ? styles.darkButton : styles.button}>
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailsScreen;
