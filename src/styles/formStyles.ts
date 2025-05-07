import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  title: {
    paddingTop: '10%',
    fontSize: 30,
    color: 'green',
  },
  message: {
    paddingTop: '10%',
    fontSize: 20,
    color: 'green',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center',
  },
  form: {
    borderWidth: 1.5,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    width: '50%',
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    color: 'white',
    width: '25%',
    backgroundColor: 'green',
    padding: '5%',
    borderRadius: 10,
  },
  field: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  link: {
    color: 'blue',
  },
});
