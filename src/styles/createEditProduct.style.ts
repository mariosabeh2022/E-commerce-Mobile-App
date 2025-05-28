import {StyleSheet} from 'react-native';

export const createEditProductStyles = StyleSheet.create({
  uploadIconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  imagesScrollView: {
    marginTop: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  removeIcon: {
    paddingLeft: 28,
  },
  scroll: {
    padding: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginTop: 4,
    marginRight: 5,
  },
  noImages: {fontFamily: 'Sansation-Bold'},
});
