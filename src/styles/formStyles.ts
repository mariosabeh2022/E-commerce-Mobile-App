import {StyleSheet, TextStyle} from 'react-native';
const baseMessage: TextStyle = {
  paddingTop: '10%',
  fontSize: 20,
};
export const styles = StyleSheet.create({
  message: {
    ...baseMessage,
    color: 'lightgreen',
  },
  darkMessage: {
    ...baseMessage,
    color: 'green',
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
  },
});
