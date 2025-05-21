import {TextInput} from 'react-native';
import {styles} from './customInput.style';
import {customInputProps} from './customInput.type';
import {placeholderColors} from './customInput.style';
import {useTheme} from '../../../contexts/themeContext';
const CustomInput = ({
  placeholder,
  autoCapitalize = 'none',
  secureEntry = false,
  value,
  onChangeText,
  keyboardType,
  editable = true,
  multiline,
}: customInputProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={
        isAppDark ? placeholderColors.dark : placeholderColors.light
      }
      style={[
        isAppDark ? styles.darkInput : styles.input,
        keyboardType === 'default' && {paddingRight: 45},
      ]}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureEntry}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      editable={editable}
      multiline={multiline}
    />
  );
};
export default CustomInput;
