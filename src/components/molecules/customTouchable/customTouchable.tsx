import {Pressable} from 'react-native';
import {styles} from './customTouchable.style';
import {customTouchableProps} from './customTouchable.type';
const CustomTouchable = ({onPress,children}: customTouchableProps) => {
  return (
    <Pressable style={styles.customTouchable} onPress={onPress}>
      {children}
    </Pressable>
  );
};
export default CustomTouchable;
