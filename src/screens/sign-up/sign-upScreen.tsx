import React, {useState} from 'react';
import {
  View,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {styles} from '../../styles/formStyles';
import {schema} from '../../utils/signUpFormValidation';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import CustomInput from '../../components/atoms/customInput/customInput';
import CustomErrorMessage from '../../components/atoms/errorMessage/errorMessage';
import CustomTitle from '../../components/atoms/customTitle/customTitle';
import CustomView from '../../components/molecules/customView/customView';
import CustomLink from '../../components/atoms/customLink/customLink';
import CustomButton from '../../components/atoms/customButton/customButton';
import CustomTouchable from '../../components/molecules/customTouchable/customTouchable';
import CustomIcon from '../../components/atoms/customIcon/customIcon';
import CustomContainer from '../../components/organismes/customContainer/customContainer';
const SignUpScreen = () => {
  type SignUpScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'SignUp'
  >;

  const navigation = useNavigation<SignUpScreenNavigationProp>();
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
    console.log('Submitted:', data);
    navigation.replace('Login');
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <CustomContainer>
        <>
          <CustomTitle text="Welcome Dear Customer" />
          <View style={styles.form}>
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
                <CustomTouchable onPress={toggleVisibility}>
                  <CustomIcon type={visiblePassword ? 'eye' : 'eye-slash'} />
                </CustomTouchable>
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
              <Pressable onPress={handleSubmit(onSubmit)}>
                <CustomButton text="SignUp" />
              </Pressable>
            </CustomView>
          </View>
          <View style={styles.linkContainer}>
            <Text>Already have an account? </Text>
            <Pressable onPress={() => navigation.replace('Login')}>
              <CustomLink text="Login" />
            </Pressable>
          </View>
        </>
      </CustomContainer>
    </TouchableWithoutFeedback>
  );
};
export default SignUpScreen;
