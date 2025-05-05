// import React, {useContext} from 'react';
import {View, Pressable, Text} from 'react-native';
// import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from './loginScreen.style';
import {TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
const LoginScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  //   const theme = useContext(ThemeContext)!;

  //   const {toggleTheme} = theme;
  const handleLogin = () => {
    navigation.navigate('Products');
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
