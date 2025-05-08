import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
const baseSkeletonComponent: ViewStyle = {
  height: 60,
  marginVertical: 8,
  borderRadius: 8,
};
const baseHeaderComponent: ViewStyle & TextStyle = {
  fontSize: 40,
  fontWeight: 'bold',
  paddingBottom: 4,
  borderBottomWidth: 4,
  borderStyle: 'dotted',
  textAlign: 'center',
};
const baseFooterComponent: ViewStyle & TextStyle = {
  fontSize: 40,
  fontWeight: 'bold',
  paddingBottom: 4,
  textAlign: 'center',
};
export const styles = StyleSheet.create({
  skeletonItem: {
    ...baseSkeletonComponent,
    backgroundColor: '#ccc',
  },
  darkSkeletonItem: {
    ...baseSkeletonComponent,
    backgroundColor: '#ccc',
  },
  headerComponent: {
    ...baseHeaderComponent,
    color: '#00ff40',
    borderColor: '#00ff40',
  },
  darkHeaderComponent: {
    ...baseHeaderComponent,
    color: '#318544',
    borderColor: '#318544',
  },
  footerComponent: {
    ...baseFooterComponent,
    color: '#00ff40',
  },
  darkFooterComponent: {
    ...baseFooterComponent,
    color: '#318544',
  },
  flatlistContainer: {
    alignItems: 'center',
  },
});
