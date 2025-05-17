import React from 'react';
import {styles} from './sixDigitInput.style';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TextInput} from 'react-native';
import {useTheme} from '../../contexts/themeContext';
const CELL_COUNT = 6;

const FourDigitInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChange,
  });
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={onChange}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <TextInput
          key={index}
          style={[
            isAppDark ? styles.darkCell : styles.cell,
            isFocused && styles.focusCell,
          ]}
          value={symbol || (isFocused ? '|' : ' ')}
          onLayout={getCellOnLayoutHandler(index)}
        />
      )}
    />
  );
};

export default FourDigitInput;
