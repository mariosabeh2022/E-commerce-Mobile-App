import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {flex: 1},
  camera: {flex: 1},
  flip: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  capture: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  capturing: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
  },
  close: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  permissionDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
