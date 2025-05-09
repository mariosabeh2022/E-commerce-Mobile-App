import {StyleSheet, TextStyle} from 'react-native';
const baseTitle: TextStyle = {
  paddingTop: '10%',
  fontSize: 30,
  alignSelf: 'center',
};
export const styles = StyleSheet.create({
  title: {
    ...baseTitle,
    color: '#00ff40',
  },
  darkTitle: {
    ...baseTitle,
    color: '#318544',
  },
});
