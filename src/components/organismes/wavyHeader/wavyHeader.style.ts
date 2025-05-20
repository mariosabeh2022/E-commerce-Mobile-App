import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexShrink:1,
    width: '100%',
  },
  upperContainer: {
    flex: 1,
    backgroundColor: '#318555',
    width: '100%',
    overflow: 'hidden',
  },
  lowerContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    overflow: 'hidden',
  },
  darkLowerContainer: {
    flex: 1,
    backgroundColor: 'gray',
    width: '100%',
    overflow: 'hidden',
  },
  wave: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    position: 'absolute',
    top: '35%',
    fontSize: 40,
    fontFamily: 'Sansation-BoldItalic',
    color: '#223a66',
    alignSelf: 'center',
    zIndex: 1,
  },
});
