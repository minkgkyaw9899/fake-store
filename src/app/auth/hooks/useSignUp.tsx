import { useForm } from 'react-hook-form';
import { SignUpFormField, signUpSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../services/signup';
import { MUTATION_KEYS } from '@/constants/queryKey';
import Toast from 'react-native-toast-message';
import { useLogin } from './useLogin';

export const useSignUp = () => {
  const { control, handleSubmit } = useForm<SignUpFormField>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      phone: '',
      firstname: '',
      lastname: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const { mutateAsync: loginAsync, isPending: isLoginPending } = useLogin();

  const { mutateAsync, isPending: isSignUpPending } = useMutation({
    mutationFn: async (data: SignUpFormField) => {
      return await signup(data);
    },
    mutationKey: [MUTATION_KEYS.SIGNUP],
    onSuccess: async data => {
      console.log('Sign Up Success:', data);
      Toast.show({
        type: 'success',
        text1: 'Sign Up Successful',
      });
      // Fake user login because FakeStore API does not support sign-up
      await loginAsync({
        username: data.data.username,
        password: data.data.password,
      });
    },
    onError: error => {
      console.log('Login Error:', error);
    },
  });

  const onSubmit = async (data: SignUpFormField) => {
    await mutateAsync(data);
  };

  const isPending = isSignUpPending || isLoginPending;

  return { control, isPending, handleSubmit: handleSubmit(onSubmit) };
};
