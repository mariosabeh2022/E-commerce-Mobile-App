import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const baseContainer: ViewStyle = {
  borderRadius: 20,
  padding: 10,
  marginBottom: 10,
};

const baseText: ViewStyle & TextStyle = {
  fontSize: 15,
  paddingTop: 5,
  borderRadius: 4,
};

export const skeletonStyles = StyleSheet.create({
  container: {
    ...baseContainer,
    backgroundColor: 'gray', // For dark mode, you might need to adjust this
    borderColor: 'gray',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  infoContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  image: {
    width: 135,
    height: 135,
    marginRight: 10,
    backgroundColor: 'lightgray', // Replace with darker shade for dark mode
    borderRadius: 10,
  },
  item: {
    ...baseText,
    height: 20,
    backgroundColor: 'lightgray', // Adjust for dark mode if necessary
    marginBottom: 5,
    width: '70%',
  },
  price: {
    ...baseText,
    height: 20,
    backgroundColor: 'lightgray',
    marginBottom: 5,
    width: '50%',
    paddingTop: 8,
  },
  textLine: {
    height: 16,
    backgroundColor: 'lightgray',
    borderRadius: 4,
    marginBottom: 8,
    width: '80%',
  },
  textLineShort: {
    height: 16,
    borderRadius: 4,
    backgroundColor: 'lightgray',
    marginBottom: 8,
    width: '50%',
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: '#333', // Dark background for dark mode
    borderColor: '#333',
  },
  darkImage: {
    backgroundColor: '#444', // Darker shade for the image placeholder
  },
  darkItem: {
    ...baseText,
    backgroundColor: '#444', // Darker background for items in dark mode
  },
  darkPrice: {
    ...baseText,
    backgroundColor: '#444', // Darker background for price in dark mode
  },
  darkTextLine: {
    backgroundColor: '#444', // Darker background for text lines
  },
  darkTextLineShort: {
    backgroundColor: '#444', // Darker background for short text lines
  },
});
