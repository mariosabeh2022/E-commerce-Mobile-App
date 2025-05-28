import React, {useCallback, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import {darkBaseColor, lightBaseColor, styles} from '../../styles/formStyles';
import {schema} from '../../utils/signUpFormValidation';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomView from '../../components/molecules/customView/customView';
import CustomLink from '../../components/atoms/customLink/customLink';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomPressable from '../../components/molecules/customPressable/customPressable';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import {UnauthenticatedStackParamList} from '../../navigation/navigator/navigationTypes';
import {useTheme} from '../../contexts/themeContext';
import WavyHeader from '../../components/organismes/wavyHeader/wavyHeader';
import {signup} from '../../lib/axiosInstance';
import {useKeyboardVisibility} from '../../hooks/useKeyboardVisibility';

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedStackParamList,
  'Login'
>;

const handleKeyboardDismiss = () => Keyboard.dismiss();

const SignUpScreen = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const handleLoginNavigation = useCallback(
    () => navigation.navigate('Login'),
    [navigation],
  );
  const [visiblePassword, setVisiblePassword] = useState(true);
  const toggleVisibility = () => setVisiblePassword(prev => !prev);
  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const result = await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });
      if (result.success === true) {
        navigation.navigate('Verification', {email: data.email});
      } else {
        setResultMessage(result.message);
      }
      setValue('firstName', '');
      setValue('lastName', '');
      setValue('email', '');
      setValue('password', '');
    } catch (err) {
      ToastAndroid.show('SignUp Server Error', ToastAndroid.SHORT);
    }
    setIsLoading(false);
  };

  const isKeyboardVisible = useKeyboardVisibility();
  return (
    <CustomContainer>
      <>
        {!isKeyboardVisible && <WavyHeader />}
        <CustomTitle text="Welcome Dear Customer" />
        <View style={styles.form}>
          <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <KeyboardAvoidingView>
              <CustomView>
                <>
                  <Controller
                    control={control}
                    name="firstName"
                    render={({field: {value, onChange}}) => (
                      <CustomInput
                        placeholder="First Name"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.firstName && (
                    <CustomErrorMessage message={errors.firstName?.message} />
                  )}
                </>
              </CustomView>
              <CustomView>
                <>
                  <Controller
                    control={control}
                    name="lastName"
                    render={({field: {value, onChange}}) => (
                      <CustomInput
                        placeholder="Last Name"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.lastName && (
                    <CustomErrorMessage message={errors.lastName?.message} />
                  )}
                </>
              </CustomView>
              <CustomView>
                <>
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
                  {errors.email && (
                    <CustomErrorMessage message={errors.email?.message} />
                  )}
                </>
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
                  {errors.password && (
                    <CustomErrorMessage message={errors.password?.message} />
                  )}
                </>
              </CustomView>
              <CustomView>
                {resultMessage.length > 1 ? (
                  <CustomErrorMessage message={resultMessage} />
                ) : isLoading ? (
                  <ActivityIndicator
                    size="large"
                    color={isAppDark ? darkBaseColor : lightBaseColor}
                  />
                ) : (
                  <Pressable onPress={handleSubmit(onSubmit)}>
                    <CustomButton text="SignUp" />
                  </Pressable>
                )}
              </CustomView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.customFont}>Already have an account? </Text>
          <Pressable onPress={handleLoginNavigation}>
            <CustomLink text="Login" />
          </Pressable>
        </View>
      </>
    </CustomContainer>
  );
};
export default SignUpScreen;
