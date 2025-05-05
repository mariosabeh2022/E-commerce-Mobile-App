import React, {useContext, useState} from 'react';
import {View, Pressable, Text, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from './sign-upScreen.type';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
const SignUpScreen = () => {
  type SignUpScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Signup'
  >;

  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const theme = useContext(ThemeContext)!;
  const {width} = Dimensions.get('window');
  const {toggleTheme} = theme;
  const [visiblePassword, setVisiblePassword] = useState(false);
  const toggleVisibility = () => setVisiblePassword(perv => !perv);
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <TextInput placeholder="Name" style={styles.input} />
      </View>
      <View style={styles.field}>
        <TextInput placeholder="Email" style={styles.input} />
      </View>
      <View style={styles.field}>
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={visiblePassword}
        />
        <TouchableOpacity
          onPress={toggleVisibility}
          style={{
            position: 'absolute',
            right: width / 3.75,
            top: '50%',
            transform: [{translateY: -15}], // center vertically
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={visiblePassword ? 'eye' : 'eye-slash'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.field}>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.field}>
        <Pressable onPress={handleLogin}>
          <Text style={styles.button}>SignUp</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default SignUpScreen;
