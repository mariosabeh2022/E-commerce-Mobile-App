import {StyleSheet, ViewStyle} from 'react-native';
const baseThumb: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  elevation: 2,
  alignItems: 'center',
  justifyContent:'center',
};
export const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 1,
    justifyContent: 'center',
  },
  thumb: {
    ...baseThumb,
    backgroundColor: '#fff',
  },
});
