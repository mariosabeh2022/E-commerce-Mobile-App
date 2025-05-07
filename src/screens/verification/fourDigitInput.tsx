import React from 'react';
import {StyleSheet} from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {TextInput} from 'react-native';
const CELL_COUNT = 4;

const FourDigitInput = ({value,onChange}:{value:string,onChange:(val:string)=>void}) => {
  //Blurs input field when the digits are filled
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  //Alternates focues on cells when needed
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue:onChange,
  });

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
          style={[styles.cell, isFocused && styles.focusCell]}
          value={symbol}
          onLayout={getCellOnLayoutHandler(index)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    width: 40,
    margin:3,
    height: 50,
    lineHeight: 20,
    fontSize: 25,
    borderWidth: 2,
    borderColor: 'gray',
    textAlign: 'center',
    borderRadius: 8,
  },
  focusCell: {
    borderColor: 'black',
  },
});

export default FourDigitInput;
