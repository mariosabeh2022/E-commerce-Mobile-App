import {Text, useColorScheme} from 'react-native';
import {CustomButtomProps} from './customButton.type';
import {styles} from './customButtom.style';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({text = 'light'}: CustomButtomProps) => {
  const theme = useColorScheme();
  return (
    <LinearGradient
      colors={['#00ff40', '#318555', '#223a66']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={
        theme === 'dark' ? styles.darkButtonContainer : styles.buttonContainer
      }>
      <Text style={styles.buttonText}>{text}</Text>
    </LinearGradient>
  );
};

export default CustomButton;
