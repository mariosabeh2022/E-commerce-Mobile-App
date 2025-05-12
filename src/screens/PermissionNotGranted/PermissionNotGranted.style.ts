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
export const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
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
  gradientText: {
    fontFamily: 'Sansation-BoldItalic',
    fontSize: 16,
    color: '#223a66',
  },
});
