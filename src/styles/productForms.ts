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
  mainModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  upperOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderLeftColor: 'white',
    borderRightColor: 'white',
  },

  darkModalContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: '#222',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderLeftColor: '#222',
    borderRightColor: '#222',
  },
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
