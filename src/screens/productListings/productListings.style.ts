import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
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
  headerComponent: {
    ...baseHeaderComponent,
    color: 'green',
    borderColor: 'green',
  },
  darkHeaderComponent: {
    ...baseHeaderComponent,
    color: 'darkgreen',
    borderColor: 'darkgreen',
  },
  footerComponent: {
    ...baseFooterComponent,
    color: 'green',
  },
  darkFooterComponent: {
    ...baseFooterComponent,
    color: 'darkgreen',
  },
  flatlistContainer: {
    alignItems: 'center',
  },
});
