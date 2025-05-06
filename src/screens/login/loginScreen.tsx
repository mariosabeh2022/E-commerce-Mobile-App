import React, {useState} from 'react';
// import { useContext } from 'react';
import {View, Pressable, Text, TouchableOpacity, Keyboard} from 'react-native';
// import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from './loginScreen.style';
import {TextInput, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Dimensions} from 'react-native';
import {schema} from '../../utils/loginFormValidation';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

const LoginScreen = () => {
  const {width, height} = Dimensions.get('window');
  const [submittable,setSubmittable]=useState(true);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  //   const theme = useContext(ThemeContext)!;

  //   const {toggleTheme} = theme;

  const [visiblePassword, setVisiblePassword] = useState(true);
  const toggleVisibility = () => setVisiblePassword(perv => !perv);

  type FormData = z.infer<typeof schema>;
  type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'SignUp'
  >;

  const {
    control,
    handleSubmit,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = (data: FormData) => {
    if (data.email === 'eurisko@gmail.com' && data.password === 'academy2025')
      navigation.replace('Verification');
    else {
      setValue('email','');
      setValue('password','');
      setSubmittable(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
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
      </View>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;
