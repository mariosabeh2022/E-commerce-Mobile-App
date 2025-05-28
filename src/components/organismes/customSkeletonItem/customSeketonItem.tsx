import React, {memo} from 'react';
import {View} from 'react-native';
import {useTheme} from '../../../contexts/themeContext';
import {styles} from './customSkeletonItem.style';
const CustomSkeletonItem = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';

  return (
    <View style={isAppDark ? styles.darkContainer : styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageSkeleton} />
        <View style={styles.infoContainer}>
          <View style={styles.textLineShort} />
          <View style={styles.textLineTiny} />
          <View style={styles.textLineMedium} />
          <View style={styles.textLineTiny} />
        </View>
      </View>
    </View>
  );
};

export default memo(CustomSkeletonItem);
