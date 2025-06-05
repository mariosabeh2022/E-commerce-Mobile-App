import {Pressable} from 'react-native';
import {styles} from './customPressable.style';
import {customPressableProps} from './customPressable.type';
import {memo} from 'react';
const CustomPressable = ({onPress, children}: customPressableProps) => {
  return (
    <Pressable
      testID="pressable"
      style={styles.customPressable}
      onPress={onPress}>
      {children}
    </Pressable>
  );
};
export default memo(CustomPressable);
