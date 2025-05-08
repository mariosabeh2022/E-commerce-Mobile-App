import {StyleSheet, ViewStyle} from 'react-native';
const baseButton: ViewStyle = {
  padding: '5%',
  borderRadius: 50,
};
export const styles = StyleSheet.create({
  button: {
    ...baseButton,
    color: 'white',
    backgroundColor: 'green',
  },
  darkButton: {
    ...baseButton,
    color: 'darkgray',
    backgroundColor: 'darkgreen',
  },
});
