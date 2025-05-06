import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
    padding: 10,
    borderStyle: 'solid',
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    width: width,
    height: width / 2,
    borderBottomLeftRadius: width / 1.5,
    borderBottomRightRadius: width / 1.5,
    backgroundColor: 'lightgray',
  },
  infos: {
    marginTop: width / 1.5,
  },
  desc: {
    margin: 5,
  },
  price: {
    fontSize: 25,
  },
  title: {
    fontSize: 25,
    paddingBottom: 4,
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: '100%',
    marginRight: 10,
    resizeMode: 'contain',
    borderBottomLeftRadius: width / 1.5,
    borderBottomRightRadius: width / 1.5,
  },
  share: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 12,
    borderRadius: 30,
  },
});
