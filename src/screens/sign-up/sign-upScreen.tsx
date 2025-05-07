import React, {useState} from 'react';
// import { useContext } from 'react';
import {
  View,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
// import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from './sign-upScreen.style';
import {TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Dimensions} from 'react-native';
import {schema} from '../../utils/signUpFormValidation';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
const SignUpScreen = () => {
  //   const theme = useContext(ThemeContext)!;
  const {width, height} = Dimensions.get('window');
  //   const {toggleTheme} = theme;
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
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Dear Customer</Text>
        <View style={styles.field}>
          <Controller
            control={control}
            name="name"
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder="Name"
                placeholderTextColor="grey"
                style={styles.input}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name && (
            <Text style={{color: 'red'}}>{errors.name?.message}</Text>
          )}
        </View>
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
          {errors.email && (
            <Text style={{color: 'red'}}>{errors.email.message}</Text>
          )}
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
          {errors.password && (
            <Text style={{color: 'red', marginTop: 5}}>
              {errors.password.message}
            </Text>
          )}
        </View>
        <View style={styles.field}>
          <Controller
            control={control}
            name="number"
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder="Number"
                placeholderTextColor="grey"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
              />
            )}
          />
          {errors.number && (
            <Text style={{color: 'red'}}>{errors.number.message}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text style={styles.button}>Sign Up</Text>
          </Pressable>
        </View>
        <View style={styles.linkContainer}>
          <Text>Already have an account? </Text>
          <Pressable onPress={() => navigation.replace('Login')}>
            <Text style={styles.link}>Login</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default SignUpScreen;
