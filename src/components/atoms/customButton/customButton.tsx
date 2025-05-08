import {Text, useColorScheme} from 'react-native';
import {CustomButtomProps} from './customButton.type';
import {styles} from './customButtom.style';
const CustomButton = ({text}: CustomButtomProps) => {
  const theme = useColorScheme();
  return (
    <Text style={theme === 'dark' ? styles.darkButton : styles.button}>
      {text}
    </Text>
  );
};
export default CustomButton;
