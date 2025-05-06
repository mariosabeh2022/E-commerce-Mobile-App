import React, {useState} from 'react';
// import { useContext } from 'react';
import {
  View,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
// import {ThemeContext} from '../../styles/ThemeContext';
import {styles} from './verification.style';
import {z} from 'zod';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {schema} from '../../utils/verificationValidation';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

const VerificationScreen = () => {
  //   const theme = useContext(ThemeContext)!;
  //   const {toggleTheme} = theme;
  type FormData = z.infer<typeof schema>;

  type verificationScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Verification'
  >;
  const navigation = useNavigation<verificationScreenNavigationProp>();
  const {control, handleSubmit, setValue} = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      verificationCode: '',
    },
  });

  const [submittable, setSubmittable] = useState(true);

  const handleVerify = (data: FormData) => {
    if (data.verificationCode === '1234') navigation.replace('Products');
    else {
      setValue('verificationCode', '');
      setSubmittable(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.field}>
          <Controller
            control={control}
            name="verificationCode"
            render={({field: {value, onChange}}) => (
              <TextInput
                placeholder="Verification Code"
                placeholderTextColor="grey"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType="number-pad"
              />
            )}
          />
        </View>
        {!submittable && (
          <Text style={{color: 'red'}}>Incorrect Verification Code</Text>
        )}
        <Pressable onPress={handleSubmit(handleVerify)}>
          <Text style={styles.button}>Verify</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default VerificationScreen;
