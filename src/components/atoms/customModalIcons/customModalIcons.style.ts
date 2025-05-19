import {StyleSheet} from 'react-native';
import {darkBaseColor, lightBaseColor} from '../../../styles/formStyles';

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middleContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 60,
    padding: 20,
    marginHorizontal: 10,
  },
  customModalIcon: {
    color: lightBaseColor,
  },
  darkCustomModalIcon: {
    color: darkBaseColor,
  },
  label: {
    fontFamily: 'Sansation-Bold',
    color: 'black',
    marginTop: 8,
  },
  darkLabel: {
    fontFamily: 'Sansation-Bold',
    color: 'white',
    marginTop: 8,
  },
});
