import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useTheme} from '../../../contexts/themeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';

const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const granted = await PermissionsAndroid.request(permission, {
        title: 'Gallery Permission',
        message: 'App needs access to your photos',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true; // iOS handled by library
  }
};

type CustomImageInputProps = {
  image: {
    uri?: string;
    _id?: string;
  } | null;
  onImagesChange: (img: {uri: string; _id: string}) => void;
};

const CustomImageInput: React.FC<CustomImageInputProps> = ({
  image,
  onImagesChange,
}) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';

  const handleImagePick = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      console.log('Gallery permission denied');
      return;
    }

    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
    })
      .then(selectedImage => {
        const newImage = {
          uri: selectedImage.path,
          _id: `${Math.floor(Math.random() * 9000) + 1000}`,
        };
        onImagesChange(newImage);
        console.log('Selected image:', newImage);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {image?.uri && (
        <Image
          source={{uri: image.uri}}
          style={{
            width: 80,
            height: 80,
            marginRight: 8,
            marginBottom: 8,
            borderRadius: 8,
          }}
        />
      )}
      <TouchableOpacity
        onPress={handleImagePick}
        style={{
          width: 80,
          height: 80,
          backgroundColor: isAppDark ? '#333' : '#eee',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}>
        <Icon name="add" size={30} color={isAppDark ? 'white' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomImageInput;
