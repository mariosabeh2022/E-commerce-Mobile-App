import {Pressable} from 'react-native';
import {styles} from './customPressable.style';
import {customPressableProps} from './customPressable.type';
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
export default CustomPressable;
