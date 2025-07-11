import Icon from 'react-native-vector-icons/FontAwesome5';
import {customIconProps} from './customIcon.type';
import {styles} from './customIconstyle';
import {useTheme} from '../../../contexts/themeContext';
import { memo } from 'react';
const CustomIcon = ({type}: customIconProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  if (type === 'sun') {
    return (
      <Icon testID="custom-sun-icon" name={type} size={20} style={styles.sun} />
    );
  } else {
    return (
      <Icon
        testID="custom-icon"
        name={type}
        size={20}
        style={isAppDark ? styles.darkCustomIcon : styles.customIcon}
      />
    );
  }
};
export default memo(CustomIcon);
