import {TouchableOpacity} from 'react-native';
import {styles} from './customTouchable.style';
import {customTouchableProps} from './customTouchable.type';
const CustomTouchable = ({onPress,children}: customTouchableProps) => {
  return (
    <TouchableOpacity style={styles.customTouchable} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};
export default CustomTouchable;
