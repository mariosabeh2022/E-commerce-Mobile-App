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
  fontFamily: 'Sansation-Bold',
  paddingBottom: 4,
  textDecorationLine: 'underline',
};
const baseSpec: TextStyle = {
  fontSize: 25,
  fontFamily: 'Sansation-Bold',
  paddingBottom: 4,
};
const basePrice: TextStyle = {
  fontSize: 25,
  fontFamily: 'Sansation-BoldItalic',
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
    fontFamily: 'Sansation-Bold',
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
  spec: {
    ...baseSpec,
    color: 'black',
  },
  darkSpec: {
    ...baseSpec,
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
    ...baseButtonContainer,
    padding: 2,
    marginTop: 20,
    borderRadius: 40,
    backgroundColor: '#00ff40',
  },
  darkButtonContainer: {
    ...baseButtonContainer,
    padding: 2,
    marginTop: 20,
    borderRadius: 40,
    backgroundColor: '#318544',
  },
  button: {
    fontFamily: 'Sansation-BoldItalic',
    fontSize: 16,
    color: '#223a66',
  },
  darkButton: {
    fontFamily: 'Sansation-BoldItalic',
    fontSize: 16,
    color: '#223a66',
  },
});
