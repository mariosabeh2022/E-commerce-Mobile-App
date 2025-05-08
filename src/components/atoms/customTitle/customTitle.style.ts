import {StyleSheet, TextStyle} from 'react-native';
const baseTitle: TextStyle = {
  paddingTop: '10%',
  fontSize: 30,
};
export const styles = StyleSheet.create({
  title: {
    ...baseTitle,
    color: 'green',
  },
  darkTitle: {
    ...baseTitle,
    color: 'darkgreen',
  },
});
