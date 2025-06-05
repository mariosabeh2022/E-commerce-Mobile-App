import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './customModalIcons.style.ts';
import {useTheme} from '../../../contexts/themeContext.tsx';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthenticatedStackParamList} from '../../../navigation/stacks/authenticatedStack.tsx';
import useUserStore from '../../../stores/profileStore/profileStore.tsx';
import {pickImageFromGallery} from '../../../utils/imagePicker.ts';
import {useImageStore} from '../../../stores/uploadStore/uploadStore.tsx';
import {useCallback, useMemo} from 'react';
type innerCustomIconProp = {
  includeRemove: boolean;
  onSelectImage?: () => void;
};

const CustomIcons = ({includeRemove, onSelectImage}: innerCustomIconProp) => {
  const {setImage} = useImageStore();
  const {theme} = useTheme();
  const {updateProfileImage} = useUserStore();
  const isAppDark = theme === 'dark';
  const borderColor = isAppDark ? 'darkgray' : 'black';
  const iconWrapperStyle = useMemo(
    () => [styles.iconWrapper, {borderColor}],
    [borderColor],
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthenticatedStackParamList>>();

  const goToCamera = useCallback(() => {
    navigation.navigate('CameraScreen', {
      onCapture: async photo => {
        //File path fallback
        const imagePath = photo.path.startsWith('file://')
          ? photo.path
          : `file://${photo.path}`;
        const imageForForm = {
          uri: imagePath,
          _id: String(Math.random() * 101 + 1000),
        };
        //Checking if modal is for profile or product, remove is for profile picture
        if (!includeRemove) {
          setImage(imageForForm);
        } else {
          updateProfileImage(imagePath);
        }
      },
    });
  }, [navigation, setImage, includeRemove, updateProfileImage]);

  const handleRemoveProfile = () => {
    updateProfileImage('');
  };

  const handleGalleryPress = async () => {
    if (onSelectImage) {
      //handled by parent component when creating or updating products
      onSelectImage();
      return;
    }
    const image = await pickImageFromGallery();
    if (image) {
      updateProfileImage(image.uri);
    }
  };

  return (
    <View testID="main-container" style={styles.mainContainer}>
      <View testID="camera-container" style={styles.middleContainer}>
        <TouchableOpacity
          testID="camera"
          style={iconWrapperStyle}
          onPress={goToCamera}>
          <Icon
            name="camera"
            style={
              isAppDark ? styles.darkCustomModalIcon : styles.customModalIcon
            }
            size={50}
          />
        </TouchableOpacity>
        <Text style={isAppDark ? styles.darkLabel : styles.label}>Camera</Text>
      </View>

      <View testID="gallery-container" style={styles.middleContainer}>
        <TouchableOpacity
          testID="gallery"
          style={iconWrapperStyle}
          onPress={handleGalleryPress}>
          <Icon
            name="image"
            style={
              isAppDark ? styles.darkCustomModalIcon : styles.customModalIcon
            }
            size={50}
          />
        </TouchableOpacity>
        <Text style={isAppDark ? styles.darkLabel : styles.label}>Gallery</Text>
      </View>
      {/* Profile Screen Completed Modal */}
      {includeRemove && (
        <View testID="remove-picture-container" style={styles.middleContainer}>
          <TouchableOpacity
            testID="remove-picture"
            style={iconWrapperStyle}
            onPress={handleRemoveProfile}>
            <Icon
              name="minus-circle"
              style={
                isAppDark ? styles.darkCustomModalIcon : styles.customModalIcon
              }
              size={50}
            />
          </TouchableOpacity>
          <Text style={isAppDark ? styles.darkLabel : styles.label}>
            Remove
          </Text>
        </View>
      )}
    </View>
  );
};

export default CustomIcons;
