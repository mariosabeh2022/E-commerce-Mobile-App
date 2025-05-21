import {StyleSheet} from 'react-native';

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
    paddingRight: 50, // space for the image button
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
});

export const placeholderColors = {
  light: '#999',
  dark: '#aaa',
};
