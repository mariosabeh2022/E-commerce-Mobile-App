import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
const baseContainer: ViewStyle = {
  borderRadius: 20,
  padding: 10,
  marginBottom: 10,
};
const basePrice: ViewStyle & TextStyle = {
  fontSize: 15,
  paddingTop: 8,
  fontWeight: 'semibold',
};
const baseItem: ViewStyle & TextStyle = {
  fontSize: 15,
  paddingTop: 5,
  fontWeight: 'bold',
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
  },
  image: {
    width: 135,
    height: 135,
    marginRight: 10,
    resizeMode: 'contain',
  },
  item: {
    ...baseItem,
    color: '#00ff40',
  },
  darkItem: {
    ...baseItem,
    color: '#318544',
  },
  price: {
    ...basePrice,
    color: 'white',
  },
  darkPrice: {
    ...basePrice,
    color: 'lightgray',
  },
});
