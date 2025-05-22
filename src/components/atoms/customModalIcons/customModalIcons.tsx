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
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthenticatedStackParamList>>();

  const goToCamera = () => {
    navigation.navigate('CameraScreen', {
      onCapture: async photo => {
        const imagePath = photo.path.startsWith('file://')
          ? photo.path
          : `file://${photo.path}`;
        const imageForForm = {
          uri: imagePath,
          _id: String(Math.random() * 101 + 1000),
        };
        setImage(imageForForm); // update Zustand image store
        console.log('Image captured:', imagePath);
      },
    });
  };

  const handleRemoveProfile = () => {
    updateProfileImage('');
  };

  const handleGalleryPress = async () => {
    if (onSelectImage) {
      onSelectImage(); // delegate to parent
      return;
    }
    const image = await pickImageFromGallery();
    if (image) {
      updateProfileImage(image.uri);
      console.log('Selected from gallery:', image);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.middleContainer}>
        <TouchableOpacity
          style={[styles.iconWrapper, {borderColor}]}
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

      <View style={styles.middleContainer}>
        <TouchableOpacity
          style={[styles.iconWrapper, {borderColor}]}
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

      {includeRemove && (
        <View style={styles.middleContainer}>
          <TouchableOpacity
            style={[styles.iconWrapper, {borderColor}]}
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
