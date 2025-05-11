import {StyleSheet, ViewStyle} from 'react-native';
const baseCustomShare: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};
export const styles = StyleSheet.create({
  customIcon: {
    ...baseCustomShare,
    color: '#000',
  },
  darkCustomIcon: {
    ...baseCustomShare,
    color: 'lightgray',
  },
});
