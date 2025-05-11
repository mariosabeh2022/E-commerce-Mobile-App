import {Text} from 'react-native';
import {CustomButtomProps} from './customButton.type';
import {styles} from './customButtom.style';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../../contexts/themeContext';

const CustomButton = ({text = 'light'}: CustomButtomProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <LinearGradient
      colors={['#00ff40', '#318555', '#223a66']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={isAppDark ? styles.darkButtonContainer : styles.buttonContainer}>
      <Text style={styles.buttonText}>{text}</Text>
    </LinearGradient>
  );
};

export default CustomButton;
