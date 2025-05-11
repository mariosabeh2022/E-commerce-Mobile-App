import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Animated,
  Image,
  Dimensions,
  ListRenderItemInfo,
  Text,
  useColorScheme,
} from 'react-native';
import {styles} from './customCarousel.style';
const {width} = Dimensions.get('window');

type ImageItem = {
  _id: string;
  uri: string;
};

type Props = {
  images?: ImageItem[];
};

const ImageCarousel: React.FC<Props> = ({images}) => {
  const theme = useColorScheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  });

  const renderItem = ({item}: ListRenderItemInfo<ImageItem>) => (
    <View style={styles.imageContainer}>
      <Image key={item._id} source={{uri: item.uri}} style={styles.image} />
    </View>
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
              theme === 'dark' ? styles.darkIndicator : styles.indicator,
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
