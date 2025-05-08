import Icon from 'react-native-vector-icons/FontAwesome5';
import {customIconProps} from './customShare.type';
import {styles} from './customShare.style';
import {useColorScheme} from 'react-native';
const CustomIcon = ({type}: customIconProps) => {
  const theme = useColorScheme();
  return (
    <Icon
      name={type}
      size={20}
      style={theme === 'dark' ? styles.darkCustomIcon : styles.customIcon}
    />
  );
};
export default CustomIcon;
