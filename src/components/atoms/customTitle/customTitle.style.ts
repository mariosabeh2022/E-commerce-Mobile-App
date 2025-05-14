import {StyleSheet, TextStyle} from 'react-native';
import { darkBaseColor, lightBaseColor } from '../../../styles/formStyles';
const baseTitle: TextStyle = {
  paddingTop: '10%',
  fontSize: 30,
  alignSelf: 'center',
  fontFamily: 'Sansation-BoldItalic',
};
export const styles = StyleSheet.create({
  title: {
    ...baseTitle,
    color: lightBaseColor,
  },
  darkTitle: {
    ...baseTitle,
    color: darkBaseColor,
  },
});
