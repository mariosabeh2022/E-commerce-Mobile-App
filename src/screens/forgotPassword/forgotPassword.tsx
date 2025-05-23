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
import {schema} from '../../utils/resetPasswordFormValidation';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {darkBaseColor, lightBaseColor, styles} from '../../styles/formStyles';
import {UnauthenticatedStackParamList} from '../../navigation/navigator/navigationTypes';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomView from '../../components/molecules/customView/customView';
import CustomLink from '../../components/atoms/customLink/customLink';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import {useTheme} from '../../contexts/themeContext';
import WavyHeader from '../../components/organismes/wavyHeader/wavyHeader';
import {resetPassword} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';
import {errorCodes} from '../../lib/errorCodes';
type LoginScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedStackParamList,
  'Verification'
>;
const ForgotPasswordScreen = () => {
  const {NOT_FOUND, FLARE, NOT_VERIFIED} = errorCodes;
  const setTokens = useAuthStore(state => state.setTokens);
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  type FormData = z.infer<typeof schema>;

  const {control, handleSubmit, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });
  const handleSignUpNavigation = useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );

  const handleKeyboardDismiss = () => Keyboard.dismiss();

  const handleLogin = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await resetPassword({
        email: data.email.trim().toLowerCase(),
      });
      if (result.success === true) {
        setTokens(result.data.accessToken, result.data.refreshToken);
      } else if (result.code === NOT_VERIFIED) {
        setValue('email', '');
        setResultMessage(result.message);
      } else if (result.code === NOT_FOUND) {
        setResultMessage(result.message);
        setValue('email', '');
      } else if (result.code === FLARE) {
        setResultMessage(result.message);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
    setIsLoading(false);
    setResultMessage('');
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
        <CustomTitle text="Please Enter Your Email" />
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
                {resultMessage.length > 0 ? (
                  <CustomErrorMessage message={resultMessage} />
                ) : isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={isAppDark ? darkBaseColor : lightBaseColor}
                  />
                ) : (
                  <Pressable onPress={handleSubmit(handleLogin)}>
                    <CustomButton text="Reset" />
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

export default ForgotPasswordScreen;
