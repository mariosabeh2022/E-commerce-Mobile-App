import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
    borderWidth: 1,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderRadius: 20,
    padding: 10,
    borderStyle: 'solid',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    paddingBottom: 4,
    textDecorationLine: 'underline',
  },
  image: {
    width: 135,
    height: 135,
    marginRight: 10,
    resizeMode: 'contain',
  },
  info: {
    padding: 9,
    borderRadius: 20,
  },
  item: {
    color: 'white',
  },
  price: {
    fontSize: 25,
    color: 'white',
    paddingTop: 8,
  },
});
