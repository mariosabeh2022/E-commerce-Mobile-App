import React, {useState} from 'react';
import {
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Dimensions} from 'react-native';
import {schema} from '../../utils/loginFormValidation';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {useAuth} from '../../contexts/authContext';
import {styles} from './loginScreen.style';

const LoginScreen = () => {
  const {width, height} = Dimensions.get('window');
  const [submittable, setSubmittable] = useState(true);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const toggleVisibility = () => setVisiblePassword(prev => !prev);

  type FormData = z.infer<typeof schema>;
  type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
  >;

  const {control, handleSubmit, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {login} = useAuth();

  const handleLogin = (data: FormData) => {
    if (data.email === 'eurisko@gmail.com' && data.password === 'academy2025') {
      login(data.email);
      navigation.replace('Verification');
    } else {
      setValue('email', '');
      setValue('password', '');
      setSubmittable(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Good To See You Again</Text>
        <View style={styles.field}>
          <Controller
            control={control}
            name="email"
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder="Email"
                placeholderTextColor="grey"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />
        </View>
        <View style={styles.field}>
          <Controller
            control={control}
            name="password"
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder="Password"
                placeholderTextColor="grey"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                secureTextEntry={visiblePassword}
              />
            )}
          />
          <TouchableOpacity
            onPress={toggleVisibility}
            style={{
              position: 'absolute',
              right: width / 3.75,
              top: height / 40,
              transform: [{translateY: -15}],
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {visiblePassword ? (
              <Icon name="eye" solid size={20} color="#000" />
            ) : (
              <Icon name="eye-slash" solid size={20} color="#000" />
            )}
          </TouchableOpacity>
          {!submittable && (
            <Text style={{color: 'red', marginTop: 5}}>
              Email Or Password Incorrect
            </Text>
          )}
        </View>

        <Pressable onPress={handleSubmit(handleLogin)}>
          <Text style={styles.button}>Login</Text>
        </Pressable>

        <View style={styles.linkContainer}>
          <Text>Don't have an account? </Text>
          <Pressable onPress={() => navigation.replace('SignUp')}>
            <Text style={styles.link}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
