import React, {useState} from 'react';
import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import FourDigitInput from './fourDigitInput';
import {styles} from '../../styles/formStyles';
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

  return (
    <CustomContainer>
      <>
        <Text style={isAppDark ? styles.darkMessage : styles.message}>
          We Have Sent The Code To Your Mail
        </Text>
        <View style={styles.form}>
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
                  color={isAppDark ? '#318544' : '#00ff40'}
                />
              ) : (
                <Pressable onPress={handleSubmit(handleVerify)}>
                  <CustomButton text="Verify" />
                </Pressable>
              )}
            </CustomView>
          </KeyboardAvoidingView>
        </View>
      </>
    </CustomContainer>
  );
};

export default VerificationScreen;
