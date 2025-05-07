import Icon from 'react-native-vector-icons/FontAwesome5';
import {EyeProps} from './eye.type';
import {styles} from './eye.style';
const Eye = ({type}: EyeProps) => {
  return <Icon name={type} size={20} style={styles.customEye} />;
};
export default Eye;
