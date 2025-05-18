import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './customModalIcon.style.ts';
import {useTheme} from '../../../contexts/themeContext';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthenticatedStackParamList} from '../../../navigation/stacks/authenticatedStack.tsx';
import useUserStore from '../../../stores/profileStore/profileStore.tsx';
const CustomIcon = () => {
  const {theme} = useTheme();
  const {updateProfileImage} = useUserStore();
  const isAppDark = theme === 'dark';
  const borderColor = isAppDark ? 'darkgray' : 'black';
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthenticatedStackParamList>>();
  const goToCamera = () => {
    navigation.navigate('CameraScreen', {
      onCapture: image => {
        updateProfileImage(image?.path ?? '');
      },
    });
  };
  const handleRemoveProfile = () => {
    updateProfileImage('');
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
        <TouchableOpacity style={[styles.iconWrapper, {borderColor}]}>
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
        <Text style={isAppDark ? styles.darkLabel : styles.label}>Remove</Text>
      </View>
    </View>
  );
};
export default CustomIcon;
