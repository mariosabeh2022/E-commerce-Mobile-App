import React from 'react';
import {styles} from './fourDigitInput.style';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TextInput, useColorScheme} from 'react-native';
const CELL_COUNT = 4;

const FourDigitInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  //Blurs input field when the digits are filled
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  //Alternates focues on cells when needed
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChange,
  });
  const theme = useColorScheme();
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
            theme === 'dark' ? styles.darkCell : styles.cell,
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
