import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const baseContainer: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  marginBottom: 5,
  padding: 10,
  borderStyle: 'solid',
};
const baseButtonContainer: ViewStyle = {
  marginTop: '25%',
  alignItems: 'center',
  borderRadius: 8,
  height: width / 8,
  justifyContent: 'center',
};
const baseTitle: TextStyle = {
  fontSize: 25,
  paddingBottom: 4,
  textDecorationLine: 'underline',
};
const basePrice: TextStyle = {
  fontSize: 25,
  textDecorationLine: 'underline',
};
export const styles = StyleSheet.create({
  container: {
    ...baseContainer,
    backgroundColor: 'white',
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: 'gray',
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
    ...basePrice,
    color: 'black',
  },
  darkPrice: {
    ...basePrice,
    color: 'darkgray',
  },
  title: {
    ...baseTitle,
    color: 'black',
  },
  darkTitle: {
    ...baseTitle,
    color: 'darkgray',
  },
  image: {
    width: '100%',
    height: '100%',
    marginRight: 10,
    resizeMode: 'contain',
    borderBottomLeftRadius: width / 1.5,
    borderBottomRightRadius: width / 1.5,
  },
  buttonContainer: {
    marginTop: '25%',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 8,
    height: width / 8,
    justifyContent: 'center',
  },
  darkButtonContainer: {
    ...baseButtonContainer,
    backgroundColor: 'green',
  },
  button: {
    color: 'white',
  },
  darkButton: {
    color: 'darkgray',
  },
});
