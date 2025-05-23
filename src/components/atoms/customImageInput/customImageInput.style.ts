import {StyleSheet, ViewStyle} from 'react-native';
const baseIconContainer: ViewStyle = {
  width: 80,
  height: 80,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  marginBottom: 12,
};
export const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    paddingRight: 50,
    color: '#000',
  },
  darkInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 10,
    paddingRight: 50,
    color: '#fff',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  imageButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  imagePreview: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  iconContainer: {
    ...baseIconContainer,
    backgroundColor: '#eee',
  },
  darkIconContainer: {
    ...baseIconContainer,
    backgroundColor: '#333',
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const placeholderColors = {
  light: '#999',
  dark: '#aaa',
};
