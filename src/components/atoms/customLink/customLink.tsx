import {Text} from 'react-native';
import {styles} from './customLink.style';
import {customLinkProps} from './customLink.type';
const CustomLink = ({text}: customLinkProps) => {
  return <Text style={styles.link}>{text}</Text>;
};
export default CustomLink;
