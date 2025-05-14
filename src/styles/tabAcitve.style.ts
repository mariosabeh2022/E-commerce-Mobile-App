import {StyleSheet, ViewStyle} from 'react-native';
import {darkBaseColor, lightBaseColor} from './formStyles';
const baseActive: ViewStyle = {
  width: 60,
  height: 30,
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center',
};
const styles = StyleSheet.create({
  active: {
    ...baseActive,
    backgroundColor: lightBaseColor,
  },
  darkActive: {
    ...baseActive,
    backgroundColor: darkBaseColor,
  },
  inactive: {
    ...baseActive,
    backgroundColor: 'transparent',
  },
});
export default styles;
