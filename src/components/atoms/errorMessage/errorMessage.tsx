import {Text} from 'react-native';
import {custoErrorMessageProps} from './errorMessage.type';
import {styles} from '../../../styles/errorMessage';
const CustomErrorMessage = ({message}: custoErrorMessageProps) => {
  return <Text testID="error-message" style={styles.errorMessage}>{message}</Text>;
};
export default CustomErrorMessage;
