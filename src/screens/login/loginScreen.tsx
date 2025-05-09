import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {schema} from '../../utils/loginFormValidation';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../contexts/authContext';
import {styles} from '../../styles/formStyles';
import {UnauthenticatedStackParamList} from '../../navigation/navigator/navigationTypes';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomView from '../../components/molecules/customView/customView';
import CustomLink from '../../components/atoms/customLink/customLink';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomTouchable from '../../components/molecules/customTouchable/customTouchable';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
import CustomIcon from '../../components/atoms/customIcon/customIcon';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  UnauthenticatedStackParamList,
  'Verification'
>;

const LoginScreen = () => {
  const theme = useColorScheme();
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <CustomContainer>
        <>
          <CustomTitle text="Good To See You Again" />
          <View style={styles.form}>
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
                  <CustomTouchable onPress={toggleVisibility}>
                    <CustomIcon type={visiblePassword ? 'eye' : 'eye-slash'} />
                  </CustomTouchable>
                  {!submittable && (
                    <CustomErrorMessage message="Email Or Password Incorrect" />
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
                  <Pressable onPress={handleSubmit(handleLogin)}>
                    <CustomButton text="Login" />
                  </Pressable>
                )}
              </CustomView>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.linkContainer}>
            <Text>Don't have an account? </Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <CustomLink text="SignUp" />
            </Pressable>
          </View>
        </>
      </CustomContainer>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
