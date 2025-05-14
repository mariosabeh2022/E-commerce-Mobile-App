import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import { darkBaseColor, lightBaseColor } from '../../../styles/formStyles';
const baseContainer: ViewStyle = {
  borderRadius: 20,
  padding: 10,
  marginBottom: 10,
};
const basePrice: ViewStyle & TextStyle = {
  fontSize: 15,
  paddingTop: 8,
  fontFamily: 'Sansation-Bold',
};
const baseItem: ViewStyle & TextStyle = {
  fontSize: 15,
  paddingTop: 5,
  fontFamily: 'Sansation-BoldItalic',
};
export const styles = StyleSheet.create({
  container: {
    ...baseContainer,
    backgroundColor: 'gray',
    borderColor: 'gray',
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: 'darkgray',
    borderColor: 'darkgray',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  infoContainer: {
    padding: 10,
    backgroundColor:'lightgray',
    borderRadius: 20,
  },
  image: {
    width: 135,
    height: 135,
    marginRight: 10,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  item: {
    ...baseItem,
    color: lightBaseColor,
  },
  darkItem: {
    ...baseItem,
    color: darkBaseColor,
  },
  price: {
    ...basePrice,
    color: 'white',
  },
  darkPrice: {
    ...basePrice,
  },
});
