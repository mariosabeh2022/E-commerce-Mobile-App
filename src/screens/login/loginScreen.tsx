import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {schema} from '../../utils/loginFormValidation';
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
import CustomPressable from '../../components/molecules/customPressable/customPressable';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import {useTheme} from '../../contexts/themeContext';
import WavyHeader from '../../components/organismes/wavyHeader/wavyHeader';
import {fetchProfile, login, reVerification} from '../../lib/axiosInstance';
import useAuthStore from '../../stores/authStore/authStore';
import {errorCodes} from '../../lib/errorCodes';
import useCartStore from '../../stores/cartStore/cartStore';
import {useKeyboardVisibility} from '../../hooks/useKeyboardVisibility';
type LoginScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedStackParamList,
  'Verification'
>;
const LoginScreen = () => {
  const {UNAUTHORIZED, NOT_FOUND, FLARE, NOT_VERIFIED} = errorCodes;
  //Login Token function
  const setTokens = useAuthStore(state => state.setTokens);
  //Cart User Token function
  const setCartUserId = useCartStore(state => state.setCartUserId);
  //Cart User Token
  const cartUserId = useCartStore(state => state.cartUserId);
  const clearProducts = useCartStore(state => state.clearProducts);
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(true);
  const [resultMessage, setResultMessage] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const toggleVisibility = () => setVisiblePassword(prev => !prev);

  type FormData = z.infer<typeof schema>;

  const {control, handleSubmit, setValue, getValues} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSignUpNavigation = useCallback(
    () => navigation.navigate('SignUp'),
    [navigation],
  );

  const handlePasswordNavigation = useCallback(
    () => navigation.navigate('Forgot Password'),
    [navigation],
  );

  const handleKeyboardDismiss = () => Keyboard.dismiss();

  const handleLogin = async (data: FormData) => {
    setIsLoading(true);
    setSubmittable(true);
    try {
      const result = await login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });
      if (result.success === true) {
        const fetchedUser = await fetchProfile({
          token: result.data.accessToken,
        });
        if (fetchedUser.data) {
          if (cartUserId !== fetchedUser.data.user.id) {
            clearProducts();
          }
        }
        setTokens(result.data.accessToken, result.data.refreshToken);
        setCartUserId(fetchedUser.data.user.id);
      } else if (result.code === UNAUTHORIZED) {
        setValue('email', '');
        setValue('password', '');
        setResultMessage(result.message);
      } else if (result.code === NOT_VERIFIED) {
        setShowVerification(true);
        setValue('password', '');
        setResultMessage(result.message);
      } else if (result.code === NOT_FOUND) {
        setResultMessage(result.message);
        setValue('password', '');
      } else if (result.code === FLARE) {
        setResultMessage(result.message);
      }
    } catch (err) {
      ToastAndroid.show('Login Server Error', ToastAndroid.SHORT);
    }
    setIsLoading(false);
    setSubmittable(false);
  };

  const isKeyboardVisible = useKeyboardVisibility();
  const handleVerificationRedirection = async () => {
    setIsLoading(true);
    const Email = getValues('email');
    const result = await reVerification({email: Email});
    setIsLoading(false);
    if (result.success === true) {
      navigation.navigate('Verification', {email: Email});
    }
  };
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
                    <>
                      <CustomErrorMessage message={resultMessage} />
                      {showVerification ? (
                        <Pressable onPress={handleVerificationRedirection}>
                          <CustomLink text="Click To Verify" />
                        </Pressable>
                      ) : (
                        ''
                      )}
                    </>
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
          <Text style={styles.customFont}>Forgot your password? </Text>
          <Pressable onPress={handlePasswordNavigation}>
            <CustomLink text="Reset Password" />
          </Pressable>
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
