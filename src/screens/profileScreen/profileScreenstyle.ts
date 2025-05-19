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
  uploadImage: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
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
    width: 150,
    height: 150,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75,
    overflow: 'hidden', // optional, for clipping
  },

  editingInput: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  info: {
    ...baseInfo,
  },
  darkInfo: {
    ...baseInfo,
    color: 'lightgray',
  },
  data: {
    ...baseData,
    color: lightBaseColor,
  },
  darkData: {
    ...baseData,
    color: darkBaseColor,
  },
  mainModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  upperOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  modalContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderLeftColor: 'white',
    borderRightColor: 'white',
  },

  darkModalContainer: {
    width: '100%',
    height: '35%',
    backgroundColor: '#222',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderLeftColor: '#222',
    borderRightColor: '#222',
  },
  buttonsContainer: {marginTop: '10%'},
});
