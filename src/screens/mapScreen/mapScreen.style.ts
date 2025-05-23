import {StyleSheet} from 'react-native';
import { darkBaseColor, lightBaseColor } from 'styles/formStyles';

export const styles = StyleSheet.create({
  mainMapcontainer: {
    flex: 1,
    width: '100%',
    height: '45%',
  },
  mapContainer: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
  },
  mapView: {
    flex: 1,
  },
  innerView: {
    width: 10,
    height: 10,
    backgroundColor: lightBaseColor,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: darkBaseColor,
  },
});
