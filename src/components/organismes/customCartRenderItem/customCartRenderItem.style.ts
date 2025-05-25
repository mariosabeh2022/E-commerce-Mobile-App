import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {darkBaseColor, lightBaseColor} from '../../../styles/formStyles';
const baseContainer: ViewStyle = {
  borderRadius: 20,
  padding: 10,
  marginBottom: 10,
};
const basePrice: ViewStyle & TextStyle = {
  fontSize: 15,
  fontFamily: 'Sansation-Bold',
};
const baseItem: ViewStyle & TextStyle = {
  flex: 1,
  flexWrap: 'wrap',
  fontSize: 15,
  fontFamily: 'Sansation-BoldItalic',
  alignItems: 'center',
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
    alignItems: 'center',
  },
  infoContainer: {
    padding: 10,
    width: '50%',
    height: '75%',
    backgroundColor: 'lightgray',
    borderRadius: 20,
  },
  rightCount: {
    alignSelf: 'flex-end',
    backgroundColor: 'gray',
    alignItems: 'center',
    borderRadius: 20,
    width: '30%',
    height: '20%',
  },
  image: {
    width: 135,
    height: 135,
    marginRight: 10,
    resizeMode: 'contain',
    borderRadius: 40,
  },
  item: {
    ...baseItem,
    color: lightBaseColor,
  },
  darkItem: {
    ...baseItem,
    color: darkBaseColor,
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  price: {
    ...basePrice,
    color: 'white',
  },
  darkPrice: {
    ...basePrice,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  deleteButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
