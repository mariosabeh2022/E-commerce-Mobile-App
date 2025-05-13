import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

const baseContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
};
const baseText: TextStyle = {
  fontFamily: 'Sansation-BoldItalic',
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
};
export const styles = StyleSheet.create({
  container: {
    ...baseContainer,
    backgroundColor: '#fff',
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: 'gray',
  },
  text: {
    ...baseText,
    color: '#333',
  },
  darkText: {
    ...baseText,
    color: 'lightgray',
  },
});
