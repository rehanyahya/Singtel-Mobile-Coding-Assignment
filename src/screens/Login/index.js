import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import styles from './styles';
import {createUserOrLogin} from '../../util';

const CustomTextInput = ({
  name,
  control,
  errors,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  return (
    <View style={{marginTop: 20}}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="grey"
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
        )}
        name={name}
      />
      {errors.email && (
        <Text style={styles.errorTextStyle}>This is required.</Text>
      )}
    </View>
  );
};

const Login = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = data => {
    setIsLoading(true);
    createUserOrLogin(data.email, data.password, () => {
      setIsLoading(false);
      navigation.replace('Leaderboard');
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingTextStyle}>Login/Create Account</Text>
      <CustomTextInput
        control={control}
        errors={errors}
        placeholder="Enter Email"
        name="email"
        keyboardType="email-address"
      />
      <CustomTextInput
        control={control}
        errors={errors}
        placeholder="Enter Password"
        name="password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={styles.buttonTextStyle}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
