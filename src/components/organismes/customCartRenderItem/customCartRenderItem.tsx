import React, {useCallback, useMemo, useRef} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {styles} from './customCartRenderItem.style';
import {customCartRenderItemProps} from './customCartRenderItem.type';
import {useTheme} from '../../../contexts/themeContext';
import {API_URL} from '../../../config/index';
import useCartStore from '../../../stores/cartStore/cartStore';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = -0.25 * SCREEN_WIDTH;

const CustomRenderItem = ({item}: customCartRenderItemProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const removeProduct = useCartStore(state => state.removeProduct);
  const handleDelete = useCallback(
    () => removeProduct(item._id),
    [removeProduct, item._id],
  );

  const translateX = useRef(new Animated.Value(0)).current;
  const animatedStyle = useMemo(
    () => [
      {transform: [{translateX}]},
      isAppDark ? styles.darkContainer : styles.container,
    ],
    [translateX, isAppDark],
  );
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 10,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < SWIPE_THRESHOLD) {
          Animated.timing(translateX, {
            toValue: -SCREEN_WIDTH,
            duration: 250,
            useNativeDriver: true,
          }).start(() => handleDelete());
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.swipeContainer}>
      <View
        style={
          isAppDark ? styles.darkDeleteBackground : styles.deleteBackground
        }>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Animated.View {...panResponder.panHandlers} style={animatedStyle}>
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
      </Animated.View>
    </View>
  );
};
export default CustomRenderItem;
