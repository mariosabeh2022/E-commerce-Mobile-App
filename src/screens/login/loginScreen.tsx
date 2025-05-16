import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {schema} from '../../utils/loginFormValidation';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../contexts/authContext';
import {darkBaseColor, lightBaseColor, styles} from '../../styles/formStyles';
import {UnauthenticatedStackParamList} from '../../navigation/navigator/navigationTypes';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomView from '../../components/molecules/customView/customView';
import CustomLink from '../../components/atoms/customLink/customLink';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomPressable from '../../components/molecules/customPressable/customPressable';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {useTheme} from '../../contexts/themeContext';
import WavyHeader from '../../components/organismes/wavyHeader/wavyHeader';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedStackParamList,
  'Verification'
>;

const LoginScreen = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(true);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const toggleVisibility = () => setVisiblePassword(prev => !prev);

  type FormData = z.infer<typeof schema>;

  const {control, handleSubmit, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {login} = useAuth();
  const handleSignUpNavigation = useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );

  const handleKeyboardDismiss = () => Keyboard.dismiss();

  const handleLogin = (data: FormData) => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      if (
        data.email.trim().toLocaleLowerCase() === 'eurisko@gmail.com' &&
        data.password === 'academy2025'
      ) {
        login(data.email);
        setIsLoading(false);
        navigation.navigate('Verification');
      } else {
        setValue('email', '');
        setValue('password', '');
        setSubmittable(false);
        setIsLoading(false);
      }
    }, 800);
    return () => clearTimeout(timeout);
  };
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const handleKeyboardIsVisible = () => setIsKeyboardVisible(true);
    const handleKeyboardIsNotVisible = () => () => setIsKeyboardVisible(false);
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardIsVisible,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardIsNotVisible,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <CustomContainer>
      <>
        {!isKeyboardVisible && <WavyHeader />}
        <CustomTitle text="Good To See You Again" />
        <View style={styles.form}>
          <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <KeyboardAvoidingView>
              <CustomView>
                <Controller
                  control={control}
                  name="email"
                  render={({field: {value, onChange}}) => (
                    <CustomInput
                      placeholder="Email"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  )}
                />
              </CustomView>
              <CustomView>
                <>
                  <Controller
                    control={control}
                    name="password"
                    render={({field: {value, onChange}}) => (
                      <CustomInput
                        placeholder="Password"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="default"
                        secureEntry={visiblePassword}
                      />
                    )}
                  />
                  <CustomPressable onPress={toggleVisibility}>
                    <CustomIcon type={visiblePassword ? 'eye' : 'eye-slash'} />
                  </CustomPressable>
                  {!submittable && (
                    <CustomErrorMessage message="Email Or Password Incorrect" />
                  )}
                </>
              </CustomView>
              <CustomView>
                {isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={isAppDark ? darkBaseColor : lightBaseColor}
                  />
                ) : (
                  <Pressable onPress={handleSubmit(handleLogin)}>
                    <CustomButton text="Login" />
                  </Pressable>
                )}
              </CustomView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.customFont}>Don't have an account? </Text>
          <Pressable onPress={handleSignUpNavigation}>
            <CustomLink text="SignUp" />
          </Pressable>
        </View>
      </>
    </CustomContainer>
  );
};

export default LoginScreen;
