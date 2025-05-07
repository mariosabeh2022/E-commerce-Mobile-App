import {View} from 'react-native';
import {styles} from './customContanier.style';
import {customContainerProps} from './customContainer.type';
const CustomContainer = ({children}: customContainerProps) => {
  return <View style={styles.container}>{children}</View>;
};
export default CustomContainer;
