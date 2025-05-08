import React from 'react';
import {
  Text,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {styles} from './homeScreen.style';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import LinearGradient from 'react-native-linear-gradient';

const HomenScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login',
    'SignUp'
  >;
  const theme = useColorScheme();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={theme === 'dark' ? styles.darkContainer : styles.container}>
        <>
          <CustomTitle text="Welcome ! " />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <LinearGradient
              colors={['#00ff40', '#318555', '#223a66']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={
                theme === 'dark'
                  ? styles.darkButtonContainer
                  : styles.buttonContainer
              }>
              <Text style={styles.gradientText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>
          <LinearGradient
            colors={['#00ff40', '#318555', '#223a66']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorder}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.innerButton}>
              <Text style={styles.gradientText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
        </>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomenScreen;
