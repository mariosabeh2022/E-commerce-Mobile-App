import {View} from 'react-native';
import {styles} from './customContanier.style';
import {customContainerProps} from './customContainer.type';
import {useTheme} from '../../../contexts/themeContext';
const CustomContainer = ({children}: customContainerProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <View style={isAppDark ? styles.darkContainer : styles.container}>
      {children}
    </View>
  );
};
export default CustomContainer;
