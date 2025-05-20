import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Animated,
  Image,
  Dimensions,
  ListRenderItemInfo,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {styles} from './customCarousel.style';
import {useTheme} from '../../../contexts/themeContext';
import {customCarouselProps, ImageItem} from './customCarousel.type';
import {API_URL} from '../../../config/index';
import {downloadImage} from '../../../hooks/useSaveImage';
const {width} = Dimensions.get('window');

const ImageCarousel = ({images}: customCarouselProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  });
  const showConfirmation = (onConfirm: () => void) => {
    Alert.alert(
      'Download Image',
      'Are you sure you want to download this image?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Download cancelled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: onConfirm,
        },
      ],
      {cancelable: true},
    );
  };
  const handlePictureDownload = (path: string) => {
    return () => showConfirmation(() => downloadImage(API_URL + path));
  };
  const renderItem = ({item}: ListRenderItemInfo<ImageItem>) => (
    <TouchableWithoutFeedback onLongPress={handlePictureDownload(item.uri)}>
      <View style={styles.imageContainer}>
        <Image
          key={item._id}
          source={{uri: API_URL + item.uri}}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View>
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={handleScroll}
          initialNumToRender={1}
          windowSize={5}
        />
      </Animated.View>

      <View style={styles.indicatorContainer}>
        {images?.map((_, index) => (
          <Text
            key={index}
            style={[
              isAppDark ? styles.darkIndicator : styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}>
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;
