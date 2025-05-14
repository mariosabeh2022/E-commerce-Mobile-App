import Icon from 'react-native-vector-icons/FontAwesome5';
import {customIconProps} from './customIcon.type';
import {styles} from './customIconstyle';
import {useTheme} from '../../../contexts/themeContext';
const CustomIcon = ({type}: customIconProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  if (type === 'sun') {
    return <Icon name={type} size={20} style={styles.sun} />;
  } else {
    return (
      <Icon
        name={type}
        size={20}
        style={isAppDark ? styles.darkCustomIcon : styles.customIcon}
      />
    );
  }
};
export default CustomIcon;
