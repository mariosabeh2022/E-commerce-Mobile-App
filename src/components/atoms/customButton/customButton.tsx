import {Text} from 'react-native';
import {CustomButtomProps} from './customButton.type';
import {styles} from './customButtom.style';
const CustomButton = ({text}: CustomButtomProps) => {
  return <Text style={styles.button}>{text}</Text>;
};
export default CustomButton;
