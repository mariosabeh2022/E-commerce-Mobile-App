import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTheme} from '../../../contexts/themeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {PermissionsAndroid, Platform} from 'react-native';

const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Gallery Permission',
            message: 'App needs access to your photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'App needs access to your photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true; // iOS handled automatically
  }
};

type CustomImageInputProps = {
  images: {url: string; _id?: string}[];
  onImagesChange: (images: {url: string; _id?: string}[]) => void;
};
const CustomImageInput = ({images, onImagesChange}: CustomImageInputProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';

  useEffect(() => {
    console.log('Current images:', images);
  }, [images]);

  const handleImagePick = async () => {
    console.log('Opening image library...');
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      console.log('Gallery permission denied');
      return;
    }
    launchImageLibrary({mediaType: 'photo'}, response => {
      console.log('Image picker response:', response);
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          onImagesChange([...images, {url: uri}]);
        }
      }
    });
  };
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {images.map((image, i) => (
        <Image
          key={i}
          source={{uri: image.url}}
          style={{width: 80, height: 80, marginRight: 8, borderRadius: 8}}
        />
      ))}
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
