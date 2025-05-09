import {StyleSheet, ViewStyle, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const baseButtonContainer: ViewStyle = {
  width: width / 2.1,
  height: width / 8.5,
  alignItems: 'center',
  borderRadius: 40,
  justifyContent: 'center',
};
export const styles = StyleSheet.create({
  buttonContainer: {
    ...baseButtonContainer,
    color: 'white',
  },
  darkButtonContainer: {
    ...baseButtonContainer,
    color: 'darkgray',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Sansation-BoldItalic',
    fontSize: 16,
  },
});
