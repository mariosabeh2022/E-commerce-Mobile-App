import {View, Image, Text, Pressable, Share} from 'react-native';
import {styles} from './customRenderItem.style';
import {customRenderItemProps} from './customRenderItem.type';
import {useTheme} from '../../../contexts/themeContext';
import {API_URL} from '../../../config/index';
import CustomIcon from '../../../components/atoms/customIcon/customIcon';
import {useCallback} from 'react';
const CustomRenderItem = ({item}: customRenderItemProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const handleShare = useCallback(
    (id: string) => () => {
      const url = `ecommerceMobileApp://details/${id}`;
      Share.share({
        message: `Check out this product: ${url}`,
      });
    },
    [],
  );
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
          <Pressable
            onPress={handleShare(item._id)}
            style={styles.inlineShareButton}>
            <CustomIcon type="share-alt" />
          </Pressable>

          <Text style={isAppDark ? styles.darkPrice : styles.price}>
            {item.price}$
          </Text>
          <Text style={isAppDark ? styles.darkItem : styles.item}>
            Quantity: 1
          </Text>
          <Text style={isAppDark ? styles.darkPrice : styles.price}>
            View More Details
          </Text>
        </View>
      </View>
    </View>
  );
};
export default CustomRenderItem;
