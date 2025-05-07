import {Text} from 'react-native';
import {styles} from './customTitle.style';
import { customTitleProps } from './customTitle.type';

const CustomTitle = ({text}:customTitleProps) => {
  return <Text style={styles.title}>{text}</Text>;
};
export default CustomTitle;
