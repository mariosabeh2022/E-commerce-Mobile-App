import {View, Image, Text, useColorScheme} from 'react-native';
import {styles} from './customRenderItem.style';
import {customRenderItemProps} from './customRenderItem.type';
const CustomRenderItem = ({item}: customRenderItemProps) => {
  const theme = useColorScheme();
  return (
    <View style={theme === 'dark' ? styles.darkContainer : styles.container}>
      <View style={styles.innerContainer}>
        <Image source={{uri: item.images[0].url}} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={theme === 'dark' ? styles.darkItem : styles.item}>
            {item.title}
          </Text>
          <Text style={theme === 'dark' ? styles.darkPrice : styles.price}>
            {item.price}$
          </Text>
          <Text style={theme === 'dark' ? styles.darkItem : styles.item}>
            Quantity: 1
          </Text>
          <Text style={theme === 'dark' ? styles.darkPrice : styles.price}>
            View More Details
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CustomRenderItem;
