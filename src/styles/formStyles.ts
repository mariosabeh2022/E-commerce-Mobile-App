import {StyleSheet, TextStyle} from 'react-native';
const baseMessage: TextStyle = {
  fontFamily: 'Sansation-BoldItalic',
  paddingTop: '10%',
  fontSize: 20,
};
export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  message: {
    ...baseMessage,
    color: '#00ff40',
  },
  darkMessage: {
    ...baseMessage,
    color: '#318544',
  },
  form: {
    borderWidth: 1.5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop:5,
  },
  customFont:{
    fontFamily:'Sansation-Bold',
  }
});
