import {StyleSheet, TextStyle} from 'react-native';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const baseIndicator: TextStyle = {
  fontSize: 30,
  marginHorizontal: 5,
};
export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width,
    height: width / 2,
    borderBottomLeftRadius: width / 1.5,
    borderBottomRightRadius: width / 1.5,
    backgroundColor: 'lightgray',
  },
  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderBottomLeftRadius: width / 1.5,
    borderBottomRightRadius: width / 1.5,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    ...baseIndicator,
    color: 'gray',
  },
  darkIndicator: {
    ...baseIndicator,
    color: 'lightgray',
  },
  activeIndicator: {
    color: 'black',
  },
});
