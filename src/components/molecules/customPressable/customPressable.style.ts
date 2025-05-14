import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const styles = StyleSheet.create({
  customPressable: {
    position: 'absolute',
    right: width / 3.75,
    top: height / 40,
    transform: [{translateY: -15}],
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
