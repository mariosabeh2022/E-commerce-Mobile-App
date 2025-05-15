import {StyleSheet, ViewStyle} from 'react-native';
const baseCustomIcon: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};
export const styles = StyleSheet.create({
  customIcon: {
    ...baseCustomIcon,
    color: '#000',
  },
  darkCustomIcon: {
    ...baseCustomIcon,
    color: 'lightgray',
  },
  sun: {
    color: '#FFDB58',
  },
});
