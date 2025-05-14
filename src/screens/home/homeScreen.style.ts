import {StyleSheet, ViewStyle} from 'react-native';
import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const baseButtonContainer: ViewStyle = {
  marginTop: '15%',
  width: width / 1.5,
  height: width / 6,
  alignItems: 'center',
  borderRadius: 40,
  justifyContent: 'center',
};
const baseContainer: ViewStyle = {
  flex: 1,
  alignItems: 'center',
};
const baseInnerButton: ViewStyle = {
  flex: 1,
  borderRadius: 40,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
};
export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'stretch',
  },
  container: {
    ...baseContainer,
    backgroundColor: 'white',
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: 'gray',
  },
  buttonContainer: {
    ...baseButtonContainer,
  },
  darkButtonContainer: {
    ...baseButtonContainer,
  },
  innerButton: {
    ...baseInnerButton,
    backgroundColor: 'white',
  },
  darkInnerButton: {
    ...baseInnerButton,
    backgroundColor: 'lightgray',
  },
  gradientBorder: {
    ...baseButtonContainer,
    padding: 2,
    marginTop: 20,
    borderRadius: 40,
  },
  gradientText: {
    fontFamily: 'Sansation-BoldItalic',
    fontSize: 16,
    color: '#223a66',
  },
});
