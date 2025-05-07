import {TextInput} from 'react-native';
import {styles} from './customInput.style';
import {customInputProps} from './custonInput.type';
const CustomInput = ({
  placeholder,
  placeholderColor,
  autoCapitalize = 'none',
  secureEntry = false,
  value,
  onChangeText,
  keyboardType,
}: customInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      style={styles.input}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureEntry}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};
export default CustomInput;
