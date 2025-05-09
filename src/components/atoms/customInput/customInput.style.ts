import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
const baseInput: ViewStyle & TextStyle = {
  width: '50%',
  borderWidth: 1,
  borderRadius: 50,
  padding: 10,
  fontFamily: 'Sansation-BoldItalic',
};

export const styles = StyleSheet.create({
  input: {
    ...baseInput,
    backgroundColor: 'lightgray',
    borderColor: 'lightgray',
    color: 'gray',
  },
  darkInput: {
    ...baseInput,
    backgroundColor: 'darkgray',
    borderColor: 'darkgray',
    color: 'black',
  },
});
export const placeholderColors = {
  light: 'gray',
  dark: 'black',
};
