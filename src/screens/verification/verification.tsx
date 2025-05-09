import React, {useState} from 'react';
import {
  View,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  useColorScheme,
  KeyboardAvoidingView,
} from 'react-native';
import FourDigitInput from './fourDigitInput';
// import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from '../../styles/formStyles';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {schema} from '../../utils/verificationValidation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import CustomView from '../../components/molecules/customView/customView';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
type verificationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Verification'
>;
const VerificationScreen = () => {
  const theme = useColorScheme();
  const [isLoading, setIsLoading] = useState(false);
  type FormData = z.infer<typeof schema>;

  const navigation = useNavigation<verificationScreenNavigationProp>();
  const {control, handleSubmit, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      verificationCode: '',
    },
  });

  const [submittable, setSubmittable] = useState(true);

  const handleVerify = (data: FormData) => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      if (data.verificationCode === '1234') navigation.replace('Products');
      else {
        setValue('verificationCode', '');
        setSubmittable(false);
      }
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <CustomContainer>
        <>
          <Text style={styles.message}>We Have Sent The Code To Your Mail</Text>
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
                    color={theme === 'dark' ? '#318544' : '#00ff40'}
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
    </TouchableWithoutFeedback>
  );
};
export default VerificationScreen;
