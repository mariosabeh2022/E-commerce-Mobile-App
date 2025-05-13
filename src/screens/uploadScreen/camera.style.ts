import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  capture: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: 'transparent',
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
    borderRadius: 50,
    padding: 10,
  },
});
