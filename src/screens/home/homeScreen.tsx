import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {styles} from './homeScreen.style';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import LinearGradient from 'react-native-linear-gradient';
import {UnauthenticatedStackParamList} from '../../navigation/navigator/navigationTypes';
import WavyHeader from '../../components/organismes/wavyHeader/wavyHeader';
import {useTheme} from '../../contexts/themeContext';
type HomeScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedStackParamList,
  'Home'
>;
const HomeScreen = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const handleSignUpNavigation = () => navigation.navigate('SignUp');
  const handleLoginNavigation = () => navigation.navigate('Login');

  return (
    <View style={styles.outerContainer}>
      <WavyHeader />
      <View style={isAppDark ? styles.darkContainer : styles.container}>
        <View>
          <CustomTitle text="Welcome ! " />
          <Pressable onPress={handleSignUpNavigation}>
            <LinearGradient
              colors={['#00cc50', '#318555', '#223a66']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={
                isAppDark ? styles.darkButtonContainer : styles.buttonContainer
              }>
              <Text style={styles.gradientText}>Create Account</Text>
            </LinearGradient>
          </Pressable>
          <LinearGradient
            colors={['#00cc50', '#318555', '#223a66']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradientBorder}>
            <Pressable
              onPress={handleLoginNavigation}
              style={isAppDark ? styles.darkInnerButton : styles.innerButton}>
              <Text style={styles.gradientText}>Login</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
