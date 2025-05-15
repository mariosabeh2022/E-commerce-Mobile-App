import {StyleSheet, TextStyle} from 'react-native';
const baseMessage: TextStyle = {
  fontFamily: 'Sansation-BoldItalic',
  paddingTop: '10%',
  fontSize: 20,
};
export const lightBaseColor = '#00cc50';
export const darkBaseColor = '#318544';
export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  message: {
    ...baseMessage,
    color: lightBaseColor,
  },
  darkMessage: {
    ...baseMessage,
    color: lightBaseColor,
  },
  form: {
    borderWidth: 1.5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
  linkContainer: {
    flexDirection: 'row',
    paddingTop: 5,
    alignItems: 'center',
    marginBottom: '5%',
  },
  customFont: {
    fontFamily: 'Sansation-Bold',
  },
});
