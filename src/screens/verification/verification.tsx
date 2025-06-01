import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
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
import CustomInput from '../../components/atoms/customInput/customInput';
import {RouteProp} from '@react-navigation/native';
import {UnauthenticatedStackParamList} from '../../navigation/navigator/navigationTypes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useKeyboardVisibility} from '../../hooks/useKeyboardVisibility';
import { verification } from '../../api/verifyAccount/verifyAccountCall';

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
  const [errorMessage, setErrorMessage] = useState('');
  type FormData = z.infer<typeof schema>;

  const {control, handleSubmit, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: Email,
      otp: '',
    },
  });

  useEffect(() => {
    setValue('email', Email);
  }, [Email, setValue]);

  const handleVerify = useCallback(
    async (data: FormData) => {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const result = await verification({
          email: data.email.trim().toLowerCase(),
          otp: data.otp,
        });
        if (result.success === true) {
          navigation.navigate('Login');
        } else if (result.code === 400) {
          setErrorMessage(result.message || 'Verification failed');
        }
        setValue('otp', '');
      } catch (err) {
        ToastAndroid.show('Verification Error', ToastAndroid.SHORT);
      }
      setIsLoading(false);
    },
    [navigation, setValue],
  );

  const isKeyboardVisible = useKeyboardVisibility();
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
                      <SixDigitInput
                        value={value}
                        onChange={val => {
                          onChange(val);
                          if (errorMessage) {
                            setErrorMessage('');
                          }
                        }}
                      />
                    )}
                  />
                  {!!errorMessage && (
                    <CustomErrorMessage message={errorMessage} />
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
