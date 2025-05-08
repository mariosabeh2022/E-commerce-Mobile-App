import Icon from 'react-native-vector-icons/FontAwesome5';
import {customIconProps} from './customIcon.type';
import {styles} from './customIcon.style';
const CustomIcon = ({type}: customIconProps) => {
  return <Icon name={type} size={20} style={styles.customIcon} />;
};
export default CustomIcon;
