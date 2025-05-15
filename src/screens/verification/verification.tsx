import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import FourDigitInput from './fourDigitInput';
import {darkBaseColor, lightBaseColor, styles} from '../../styles/formStyles';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {schema} from '../../utils/verificationValidation';

import {useAuth} from '../../contexts/authContext';
import CustomView from '../../components/molecules/customView/customView';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import {useTheme} from '../../contexts/themeContext';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import WavyHeader from '../../components/organismes/wavyHeader/wavyHeader';
const VerificationScreen = () => {
  const {theme} = useTheme();
  const isAppDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [submittable, setSubmittable] = useState(true);
  const {verify} = useAuth();

  type FormData = z.infer<typeof schema>;

  const {control, handleSubmit, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      verificationCode: '',
    },
  });

  const handleVerify = (data: FormData) => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      if (data.verificationCode === '1234') {
        verify();
      } else {
        setValue('verificationCode', '');
        setSubmittable(false);
      }
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  };
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
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
        <CustomTitle text="Please Check Your Mail" />
        <View style={styles.form}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView>
              <CustomView>
                <>
                  <Controller
                    control={control}
                    name="verificationCode"
                    render={({field: {value, onChange}}) => (
                      <FourDigitInput value={value} onChange={onChange} />
                    )}
                  />
                  {!submittable && (
                    <CustomErrorMessage message="Incorrect Verification Code" />
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
