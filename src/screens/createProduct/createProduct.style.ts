import {StyleSheet, ViewStyle} from 'react-native';
import {Dimensions} from 'react-native';
const {height} = Dimensions.get('screen');
const baseCaptureStyle: ViewStyle = {
  position: 'absolute',
  bottom: 40,
  alignSelf: 'center',
  width: 80,
  height: 80,
  borderRadius: 40,
  borderWidth: 4,
  borderColor: '#fff',
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    borderWidth: 1.5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: height,
    position: 'absolute',
  },
  capture: {
    ...baseCaptureStyle,
    backgroundColor: 'transparent',
  },
  capturing: {
    ...baseCaptureStyle,
    backgroundColor: '#fff',
  },
  message: {
    marginTop: '4%',
    zIndex: 1,
    alignSelf: 'center',
  },
  flip: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    zIndex: 1,
    padding: 10,
  },
  close: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    zIndex: 1,
    padding: 10,
  },
});
