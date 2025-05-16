import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
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

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedStackParamList,
  'SignUp'
>;

const handleKeyboardDismiss = () => Keyboard.dismiss();

const SignUpScreen = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
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
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      number: '',
    },
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      console.log('Submitted:', data);
      navigation.navigate('Login');
      setIsLoading(false);
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
        <CustomTitle text="Welcome Dear Customer" />
        <View style={styles.form}>
          <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <KeyboardAvoidingView>
              <CustomView>
                <>
                  <Controller
                    control={control}
                    name="name"
                    render={({field: {value, onChange}}) => (
                      <CustomInput
                        placeholder="Name"
                        value={value}
                        onChangeText={onChange}
                      />
                    )}
                  />
                  {errors.name && (
                    <CustomErrorMessage message={errors.name?.message} />
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
                <>
                  <Controller
                    control={control}
                    name="number"
                    render={({field: {value, onChange}}) => (
                      <CustomInput
                        placeholder="Number: xx-xxxxxx"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="numeric"
                      />
                    )}
                  />
                  {errors.number && (
                    <CustomErrorMessage message={errors.number?.message} />
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
