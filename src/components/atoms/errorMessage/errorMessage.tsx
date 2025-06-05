import {Text} from 'react-native';
import {custoErrorMessageProps} from './errorMessage.type';
import {styles} from '../../../styles/errorMessage';
import {memo} from 'react';
const CustomErrorMessage = ({message}: custoErrorMessageProps) => {
  return (
    <Text testID="error-message" style={styles.errorMessage}>
      {message}
    </Text>
  );
};
export default memo(CustomErrorMessage);
