import {Text, useColorScheme} from 'react-native';
import {styles} from './customTitle.style';
import {customTitleProps} from './customTitle.type';
const CustomTitle = ({text}: customTitleProps) => {
  const theme = useColorScheme();
  return (
    <Text style={theme === 'dark' ? styles.darkTitle : styles.title}>
      {text}
    </Text>
  );
};
export default CustomTitle;
