import {Text} from 'react-native';
import {styles} from './customTitle.style';
import {customTitleProps} from './customTitle.type';
import {useTheme} from '../../../contexts/themeContext';
const CustomTitle = ({text}: customTitleProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <Text style={isAppDark ? styles.darkTitle : styles.title}>{text}</Text>
  );
};
export default CustomTitle;
