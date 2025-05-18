import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
const baseContainer: ViewStyle = {
  width: '100%',
  height: '100%',
  alignSelf: 'center',
  padding: '5%',
};
const baseInfo: TextStyle = {
  fontFamily: 'Sansation-Bold',
  fontSize: 20,
  paddingTop: '5%',
  marginTop: '3%',
};
const baseData: TextStyle = {
  fontFamily: 'Sansation-BoldItalic',
  alignSelf: 'center',
  fontSize: 15,
};
export const styles = StyleSheet.create({
  container: {
    ...baseContainer,
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: 'grey',
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  profileImage: {
    width: '80%',
    height: '50%',
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  editingInput: {
    width:'100%',
    paddingHorizontal:10,
    paddingVertical:10,
  },
  info: {
    ...baseInfo,
  },
  darkInfo: {
    ...baseInfo,
    color: 'white',
  },
  data: {
    ...baseData,
    color: lightBaseColor,
  },
  darkData: {
    ...baseData,
    color: darkBaseColor,
  },
});
