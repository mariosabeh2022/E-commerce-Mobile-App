import {View} from 'react-native';
import {styles} from './customView.style';
import {customViewProps} from './customView.type';
import { memo } from 'react';
const CustomView = ({children}: customViewProps) => {
  return (
    <View testID="view" style={styles.field}>
      {children}
    </View>
  );
};
export default memo(CustomView);
