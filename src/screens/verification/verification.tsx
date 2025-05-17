import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import SixDigitInput from './sixDigitInput';
import {darkBaseColor, lightBaseColor, styles} from '../../styles/formStyles';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {schema} from '../../utils/verificationValidation';
import CustomView from '../../components/molecules/customView/customView';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import {useTheme} from '../../contexts/themeContext';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import WavyHeader from '../../components/organismes/wavyHeader/wavyHeader';
import {verification} from '../../lib/axiosInstance';
import CustomInput from '../../components/atoms/customInput/customInput';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedStackParamList} from '../../navigation/navigator/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type VerificationRouteProp = RouteProp<
  UnauthenticatedStackParamList,
  'Verification'
>;

type VerificationScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedStackParamList,
  'Verification'
>;

type Props = {
  route: VerificationRouteProp;
  navigation: VerificationScreenNavigationProp;
};

const handleKeyboardDismiss = () => Keyboard.dismiss();

const VerificationScreen = ({route, navigation}: Props) => {
  const Email = route.params.email;
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(true);
  const [resultMessage, setResultMessage] = useState('');
  type FormData = z.infer<typeof schema>;

  const {control, handleSubmit, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      otp: '',
    },
  });

  const handleVerify = async (data: FormData) => {
    setIsLoading(true);
    setSubmittable(false);
    try {
      const result = await verification({
        email: data.email.trim().toLowerCase(),
        otp: data.otp,
      });
      if (result.success === true) {
        navigation.navigate('Login');
      } else if (result.code === 400) {
        setResultMessage(result.message);
      }
      setValue('email', '');
      setValue('otp', '');
    } catch (err) {
      console.error('Login error:', err);
    }
    setIsLoading(false);
    setSubmittable(true);
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
  useEffect(() => {
    setValue('email', Email);
  }, [Email, setValue]);
  return (
    <CustomContainer>
      <>
        {!isKeyboardVisible && <WavyHeader />}
        <CustomTitle text="Please Check Your Mail" />
        <View style={styles.form}>
          <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
            <KeyboardAvoidingView>
              <CustomTitle text="Verification For" />
              <CustomView>
                <Controller
                  control={control}
                  name="email"
                  render={() => (
                    <CustomInput
                      placeholder="Email"
                      value={Email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={false}
                    />
                  )}
                />
              </CustomView>
              <CustomView>
                <>
                  <Controller
                    control={control}
                    name="otp"
                    render={({field: {value, onChange}}) => (
                      <SixDigitInput value={value} onChange={onChange} />
                    )}
                  />
                  {!submittable ? (
                    <CustomErrorMessage message="Incorrect Verification Code" />
                  ) : resultMessage ? (
                    <CustomErrorMessage message={resultMessage} />
                  ) : (
                    ''
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
                  <Pressable onPress={handleSubmit(handleVerify)}>
                    <CustomButton text="Verify" />
                  </Pressable>
                )}
              </CustomView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </>
    </CustomContainer>
  );
};

export default VerificationScreen;
