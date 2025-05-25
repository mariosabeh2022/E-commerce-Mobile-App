import {View, Image, Text} from 'react-native';
import {styles} from './customCartRenderItem.style';
import {customCartRenderItemProps} from './customCartRenderItem.type';
import {useTheme} from '../../../contexts/themeContext';
import {API_URL} from '../../../config/index';
import useCartStore from '../../../stores/cartStore/cartStore';

const CustomRenderItem = ({item}: customCartRenderItemProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const removeProduct = useCartStore(state => state.removeProduct);
  const handleDelete = () => removeProduct(item._id);
  return (
    <View style={isAppDark ? styles.darkContainer : styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={{uri: API_URL + item.images[0].url}}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={isAppDark ? styles.darkItem : styles.item}>
            {item.title}
          </Text>
          <Text style={isAppDark ? styles.darkPrice : styles.price}>
            {item.price}$
          </Text>
          <View style={styles.rightCount}>
            <Text style={isAppDark ? styles.darkItem : styles.item}>
              {item.count}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CustomRenderItem;
