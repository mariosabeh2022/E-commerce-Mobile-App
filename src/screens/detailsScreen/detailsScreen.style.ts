import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {Dimensions} from 'react-native';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
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
  marginBottom: 10,
};
const baseSpec: TextStyle = {
  fontSize: 25,
  fontFamily: 'Sansation-Bold',
  paddingBottom: 4,
  marginBottom: 10,
};
const basePrice: TextStyle = {
  fontSize: 25,
  fontFamily: 'Sansation-BoldItalic',
  textDecorationLine: 'underline',
  textAlign: 'right',
  alignSelf: 'stretch',
  marginTop: 10,
  marginBottom: 20,
};
export const styles = StyleSheet.create({
  saveArea: {
    flex: 1,
  },
  darkSaveArea: {
    flex: 1,
    backgroundColor: 'gray',
  },
  container: {
    ...baseContainer,
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
    textAlign: 'center',
    alignSelf: 'stretch',
    marginBottom: 10,
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
    backgroundColor: lightBaseColor,
  },
  darkButtonContainer: {
    ...baseButtonContainer,
    padding: 2,
    marginTop: 20,
    borderRadius: 40,
    backgroundColor: darkBaseColor,
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
  mapContainer: {
    borderColor: 'red',
    borderWidth: 2,
    width: '100%',
    height: '15%',
  },
});
