import React from 'react';
import {styles} from './permissionNotGranted.style';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../contexts/themeContext';
import { Text, View } from 'react-native';
type PermissionNotYetGrantedProps={
  text:string
}
const PermissionNotYetGranted = ({text}:PermissionNotYetGrantedProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  return (
    <View style={styles.outerContainer}>
      <View style={isAppDark ? styles.darkContainer : styles.container}>
        <View>
          <LinearGradient
            colors={['#00ff40', '#318555', '#223a66']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={
              isAppDark ? styles.darkButtonContainer : styles.buttonContainer
            }>
            <Text style={styles.gradientText}>{text}</Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default PermissionNotYetGranted;
