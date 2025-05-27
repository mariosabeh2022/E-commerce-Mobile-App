import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'gray',
    borderColor: 'gray',
  },
  darkContainer: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'darkgray',
    borderColor: 'darkgray',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  infoContainer: {
    padding: 10,
    width: '50%',
    backgroundColor: 'lightgray',
    borderRadius: 20,
    justifyContent: 'space-around',
  },
  imageSkeleton: {
    width: 135,
    height: 135,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  textLineShort: {
    width: '80%',
    height: 15,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  textLineMedium: {
    width: '60%',
    height: 15,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  textLineTiny: {
    width: '40%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
});
