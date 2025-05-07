import {View} from 'react-native';
import {styles} from './customView.style';
import {customViewProps} from './customView.type';
const CustomView = ({children}: customViewProps) => {
  return (
    <View style={styles.field}>
      {children}
    </View>
  );
};
export default CustomView;
