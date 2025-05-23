import {View} from 'react-native';

import {useTheme} from '../../../contexts/themeContext';
import {skeletonStyles} from './customSkeletonItem.style';

const CustomSkeletonItem = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <View
      style={
        isAppDark ? skeletonStyles.darkContainer : skeletonStyles.container
      }>
      <View style={skeletonStyles.innerContainer}>
        <View style={skeletonStyles.image} />
        <View style={skeletonStyles.infoContainer}>
          <View style={skeletonStyles.item}>
            <View style={skeletonStyles.textLine} />
          </View>
          <View style={skeletonStyles.price}>
            <View style={skeletonStyles.textLineShort} />
          </View>
          <View style={skeletonStyles.item}>
            <View style={skeletonStyles.textLine} />
          </View>
          <View style={skeletonStyles.price}>
            <View style={skeletonStyles.textLineShort} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default CustomSkeletonItem;
