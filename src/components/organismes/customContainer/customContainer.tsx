import {useColorScheme, View} from 'react-native';
import {styles} from './customContanier.style';
import {customContainerProps} from './customContainer.type';
const CustomContainer = ({children}: customContainerProps) => {
  const theme = useColorScheme();
  return (
    <View style={theme === 'dark' ? styles.darkContainer : styles.container}>
      {children}
    </View>
  );
};
export default CustomContainer;
