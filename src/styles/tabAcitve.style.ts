import {StyleSheet, ViewStyle} from 'react-native';
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
    backgroundColor: '#00ff55',
  },
  darkActive: {
    ...baseActive,
    backgroundColor: '#318555',
  },
  inactive: {
    ...baseActive,
    backgroundColor: 'transparent',
  },
});
export default styles;
