import { useForm } from 'react-hook-form';
import { LoginFormField, loginSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/login';
import { MUTATION_KEYS } from '@/constants/queryKey';
import Toast from 'react-native-toast-message';
import { AxiosError } from 'axios';
import { saveToken } from '@/utils/keyChainService';

export const useLogin = () => {
  const { control, handleSubmit } = useForm<LoginFormField>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const setAuthUserToken = useAuthStore.use.setAuthUserToken();

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (data: LoginFormField) => {
      return await login(data);
    },
    mutationKey: [MUTATION_KEYS.LOGIN],
    onSuccess: (data, variables) => {
      setTimeout(async () => {
        await saveToken(variables.username, data.token);
        setAuthUserToken(data.token);
      }, 400);
    },
    onError: error => {
      if (error instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: error.response?.data || error.message,
        });
      }
    },
  });

  const onSubmit = async (data: LoginFormField) => {
    await mutateAsync(data);
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    isPending,
    isSuccess,
    mutateAsync,
  };
};
