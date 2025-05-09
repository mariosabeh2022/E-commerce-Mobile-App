import {StyleSheet, TextStyle} from 'react-native';
const baseInput: TextStyle = {
  width: 40,
  margin: 3,
  height: 50,
  lineHeight: 20,
  fontSize: 25,
  fontFamily: 'Sansation-BoldItalic',
  borderWidth: 2,
  borderRadius: 8,
  textAlign: 'center',
};
export const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    ...baseInput,
    borderColor: 'gray',
  },
  darkCell: {
    ...baseInput,
    borderColor: 'black',
  },
  focusCell: {
    borderColor: 'black',
  },
});
