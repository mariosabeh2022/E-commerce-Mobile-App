import Icon from 'react-native-vector-icons/FontAwesome5';
import {customIconProps} from './customShare.type';
import {styles} from './customShare.style';
import {useTheme} from '../../../contexts/themeContext';
const CustomIcon = ({type}: customIconProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <Icon
      name={type}
      size={20}
      style={isAppDark ? styles.darkCustomIcon : styles.customIcon}
    />
  );
};
export default CustomIcon;
