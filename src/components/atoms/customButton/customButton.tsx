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
      colors={['#00cc55', '#318555', '#223a66']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={isAppDark ? styles.darkButtonContainer : styles.buttonContainer}
      testID="button-background">
      <Text style={styles.buttonText} testID="custom-text">
        {text}
      </Text>
    </LinearGradient>
  );
};

export default CustomButton;
