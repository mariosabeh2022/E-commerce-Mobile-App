import React from 'react';
import {styles} from './permissionNotGranted.style';
import {useTheme} from '../../contexts/themeContext';
import {Pressable, Text, View} from 'react-native';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomButton from '../../components/atoms/customButton/customButton';
type PermissionNotYetGrantedProps = {
  openSettings?: () => Promise<void>;
  text?: string;
};
const PermissionNotGranted = ({openSettings,text}: PermissionNotYetGrantedProps) => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  if(openSettings){
  return (
    <View style={isAppDark ? styles.darkContainer : styles.container}>
      <Text style={isAppDark ? styles.darkText : styles.text}>
        <CustomErrorMessage message="Camera Permission Not Granted." />
        {'\n\n'}
        If you wish to allow permission, please use the button below.
      </Text>

      <Pressable onPress={openSettings}>
        <CustomButton text="Open Settings" />
      </Pressable>
    </View>
  )}
  else if(text){
    return (
      <View style={isAppDark ? styles.darkContainer : styles.container}>
        <Text style={isAppDark ? styles.darkText : styles.text}>
          <CustomErrorMessage message={text} />
        </Text>
      </View>
    );
  }
};

export default PermissionNotGranted;
