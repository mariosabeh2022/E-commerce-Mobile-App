import React, { useCallback } from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../../contexts/themeContext';
import ImagePicker from 'react-native-image-crop-picker';
import {requestGalleryPermission} from '../../../utils/requestGalleryPermission';
import {styles} from './customImageInput.style';
import {CustomImageInputProps} from './customImageInput.type';

const CustomImageInput: React.FC<CustomImageInputProps> = ({
  images,
  onImagesChange,
}) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';

  const handleImagePick = useCallback(async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      console.log('Gallery permission denied');
      return;
    }

    try {
      const selectedImage = await ImagePicker.openPicker({
        multiple: false,
        mediaType: 'photo',
      });

      const newImage = {
        uri: selectedImage.path,
        _id: Math.floor(Math.random() * 9000) + 1000,
      };

      onImagesChange([...images, newImage]);
    } catch (error) {
      console.log('Image picker error:', error);
    }
  }, [images, onImagesChange]);
  return (
    <View>
      <TouchableOpacity
        onPress={handleImagePick}
        style={isAppDark ? styles.darkIconContainer : styles.iconContainer}>
        <Icon name="add" size={30} color={isAppDark ? 'white' : 'black'} />
      </TouchableOpacity>
      <View style={styles.scrollViewContainer}>
        <ScrollView horizontal={true}>
          {images.map(img => (
            <Image key={img._id} source={{uri: img.uri}} style={styles.image} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CustomImageInput;
