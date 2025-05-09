import {TextInput, useColorScheme} from 'react-native';
import {styles} from './customInput.style';
import {customInputProps} from './customInput.type';
import {placeholderColors} from './customInput.style';
const CustomInput = ({
  placeholder,
  autoCapitalize = 'none',
  secureEntry = false,
  value,
  onChangeText,
  keyboardType,
}: customInputProps) => {
  const theme = useColorScheme();
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={
        theme === 'dark' ? placeholderColors.dark : placeholderColors.light
      }
      style={[
        theme === 'dark' ? styles.darkInput : styles.input,
        keyboardType === 'default' && {paddingRight: 45},
      ]}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureEntry}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};
export default CustomInput;
