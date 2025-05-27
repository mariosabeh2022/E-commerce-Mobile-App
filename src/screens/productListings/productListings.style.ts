import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
const baseSkeletonComponent: ViewStyle = {
  height: 60,
  marginVertical: 8,
  borderRadius: 8,
};
const baseHeaderComponent: ViewStyle & TextStyle = {
  fontSize: 40,
  fontFamily: 'Sansation-BoldItalic',
  paddingBottom: 4,
  marginBottom: 10,
  borderBottomWidth: 4,
  borderStyle: 'dotted',
  textAlign: 'center',
};
const baseFooterComponent: ViewStyle & TextStyle = {
  fontSize: 40,
  paddingBottom: 4,
  textAlign: 'center',
};
export const styles = StyleSheet.create({
  scrollview: {
    margin: 2,
  },
  scrollViewItemContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-around',
  },
  emptyListContainer: {
    padding: 16,
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '30%',
  },
  skeletonItem: {
    ...baseSkeletonComponent,
    backgroundColor: 'gray',
  },
  darkSkeletonItem: {
    ...baseSkeletonComponent,
    backgroundColor: 'lightgray',
  },
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerComponent: {
    ...baseHeaderComponent,
    color: lightBaseColor,
    borderColor: lightBaseColor,
  },
  darkHeaderComponent: {
    ...baseHeaderComponent,
    color: darkBaseColor,
    borderColor: darkBaseColor,
  },
  footerComponent: {
    ...baseFooterComponent,
    color: lightBaseColor,
  },
  darkFooterComponent: {
    ...baseFooterComponent,
    color: darkBaseColor,
  },
  flatlistContainer: {
    alignItems: 'center',
  },
});
