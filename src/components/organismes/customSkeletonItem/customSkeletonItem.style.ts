import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

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
    backgroundColor: 'gray',
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
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  item: {
    ...baseText,
    height: 20,
    backgroundColor: 'lightgray',
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
});
