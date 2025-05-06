import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'blue',
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
    width: 125,
    height: 125,
    marginRight: 10,
    resizeMode: 'contain',
  },
  info: {
    backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    alignContent: 'center',
  },
  item: {
    color:'white',
    alignItems: 'center',
    padding: 8,
  },
});
