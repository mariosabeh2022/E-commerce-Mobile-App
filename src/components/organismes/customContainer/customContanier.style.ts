import {StyleSheet, ViewStyle} from 'react-native';
const baseContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
};
export const styles = StyleSheet.create({
  container: {
    ...baseContainer,
    backgroundColor: 'white',
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: 'gray',
  },
});
