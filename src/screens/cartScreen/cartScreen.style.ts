import {StyleSheet, ViewStyle} from 'react-native';
import {darkBaseColor, lightBaseColor} from '../../styles/formStyles';
const baseContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
};
const baseTotalContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 5,
  borderWidth: 2,
  borderRadius: 20,
  paddingHorizontal: 20,
  width: '95%',
  height: '10%',
};
export const styles = StyleSheet.create({
  container: {
    ...baseContainer,
  },
  darkContainer: {
    ...baseContainer,
    backgroundColor: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  animation: {
    width: 200,
    height: 200,
  },
  totalContainer: {
    ...baseTotalContainer,
    borderColor: lightBaseColor,
  },
  darkTotalContainer: {
    ...baseTotalContainer,
    borderColor: darkBaseColor,
  },
  total: {
    fontFamily: 'Sansation-Bold',
    marginVertical: '5%',
  },

  darkTotal: {
    fontFamily: 'Sansation-Bold',
    color: 'white',
    marginVertical: '5%',
  },

  rightTotal: {
    fontFamily: 'Sansation-Bold',
  },
  darkRightTotal: {
    fontFamily: 'Sansation-Bold',
    color: 'white',
  },
});
