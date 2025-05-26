import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

const baseContainer: ViewStyle = {
  borderRadius: 20,
  padding: 10,
};

const baseText: ViewStyle & TextStyle = {
  fontSize: 15,
  paddingTop: 5,
  borderRadius: 4,
};

export const skeletonStyles = StyleSheet.create({
  container: {
    ...baseContainer,
    backgroundColor: 'gray',
    borderColor: 'gray',
    flexDirection: 'column',
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: 'darkgray',
    borderColor: 'darkgray',
    flexDirection: 'column',
  },
  innerContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  item: {
    ...baseText,
    height: 20,
    backgroundColor: 'lightgray',
    marginBottom: 5,
    width: '90%',
  },
  price: {
    ...baseText,
    height: 20,
    backgroundColor: 'lightgray',
    marginBottom: 5,
    width: '70%',
    paddingTop: 8,
  },
  textLine: {
    height: 16,
    backgroundColor: 'lightgray',
    borderRadius: 4,
    marginBottom: 8,
    width: '100%',
  },
  textLineShort: {
    height: 16,
    borderRadius: 4,
    backgroundColor: 'lightgray',
    marginBottom: 8,
    width: '100%',
  },
});
