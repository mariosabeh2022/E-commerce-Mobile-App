import React, {useCallback, useMemo} from 'react';
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
  const decreaseProductCount = useCartStore(
    state => state.decreaseProductCount,
  );
  const removeProduct = useCartStore(state => state.removeProduct);
  const handleDelete = useCallback(
    () => removeProduct(item._id),
    [removeProduct, item._id],
  );
  const handleDecrease = useCallback(() => {
    if (item.count > 1) {
      decreaseProductCount(item._id);
    }
  }, [decreaseProductCount, item._id, item.count]);

  //Setting up animation values
  const translateX = useMemo(() => new Animated.Value(0), []);
  const animatedStyle = useMemo(
    () => [
      {transform: [{translateX}]},
      isAppDark ? styles.darkContainer : styles.container,
    ],
    [translateX, isAppDark],
  );

  //Pan responder
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 10,
        //Updating X values
        onPanResponderMove: (_, gestureState) => {
          translateX.setValue(gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
          //Delete threshold check
          if (gestureState.dx < SWIPE_THRESHOLD) {
            Animated.timing(translateX, {
              toValue: -SCREEN_WIDTH,
              duration: 250,
              useNativeDriver: true,
            }).start(() => handleDelete());
          } //Decrease threshold check
          else if (gestureState.dx > 50) {
            //Valid item count to decrease
            if (item.count > 1) {
              Animated.timing(translateX, {
                toValue: 100,
                duration: 150,
                useNativeDriver: true,
              }).start(() => {
                handleDecrease();
                Animated.spring(translateX, {
                  toValue: 0,
                  useNativeDriver: true,
                }).start();
              });
            } //Reset
            else {
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            }
          } //Reset
          else {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [translateX, handleDelete, handleDecrease, item.count],
  );

  return (
    <View style={styles.swipeContainer}>
      <View
        style={
          isAppDark ? styles.darkDeleteBackground : styles.deleteBackground
        }>
        <View style={styles.decreaseContainer}>
          <Text style={styles.deleteText}>Decrease</Text>
        </View>
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
