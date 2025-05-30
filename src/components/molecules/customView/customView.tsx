import {View} from 'react-native';
import {styles} from './customView.style';
import {customViewProps} from './customView.type';
const CustomView = ({children}: customViewProps) => {
  return (
    <View testID="view" style={styles.field}>
      {children}
    </View>
  );
};
export default CustomView;
