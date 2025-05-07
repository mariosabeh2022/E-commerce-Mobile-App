import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  header:{
    height:'10%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
    borderWidth: 1,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderRadius: 20,
    padding: 10,
    borderStyle: 'solid',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'green',
    paddingBottom: 4,
    borderBottomWidth: 4,
    borderColor: 'green',
    borderStyle: 'dotted',
  },
  image: {
    width: 135,
    height: 135,
    marginRight: 10,
    resizeMode: 'contain',
  },
  info: {
    padding: 9,
    borderRadius: 20,
  },
  item: {
    color: 'green',
    fontSize: 15,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    fontWeight: 'semibold',
    color: 'white',
    paddingTop: 8,
  },
  flatlistContainer: {
    margin: 3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderItemContainer: {
    margin: 3,
  },
});
