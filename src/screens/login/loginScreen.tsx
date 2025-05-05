import React, {useContext} from 'react';
import {View, Alert, Pressable, Text} from 'react-native';
import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from './loginScreen.style';
import {TextInput} from 'react-native';
const LoginScreen = () => {
  const theme = useContext(ThemeContext)!;

  const {toggleTheme} = theme;
  const handleLogin = () => {
    Alert.alert('test');
  };
  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" style={styles.input} />
      <Pressable onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </Pressable>
    </View>
  );
};
export default LoginScreen;
