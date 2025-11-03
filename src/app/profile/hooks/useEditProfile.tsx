import { MUTATION_KEYS } from '@/constants/queryKey';
import { useMutation } from '@tanstack/react-query';
import {
  UpdateUserProfileFormField,
  updateUserProfileSchema,
} from '../schemas';
import { updateProfile } from '../services/updateProfile';
import omit from 'lodash.omit';
import { useUserStore } from '@/stores/useUserInfoStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { UserInfo } from '@/app/auth/services/getUserById';
import { useNavigation } from '@react-navigation/native';

export const useEditProfile = () => {
  const navigation = useNavigation();
  const { authUser, setAuthUser } = useUserStore(state => state);

  const { control, handleSubmit } = useForm<UpdateUserProfileFormField>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      firstname: authUser?.name.firstname,
      lastname: authUser?.name.lastname,
      email: authUser?.email,
      username: authUser?.username,
      password: authUser?.password,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_USER],
    mutationFn: (req: Partial<UserInfo> & { userId: number }) =>
      updateProfile(omit(req, ['userId']), req.userId),
    onSuccess: res => {
      if (res.data) {
        Toast.show({
          type: 'success',
          text1: 'Successfully updated you information',
        });
        setAuthUser(res.data);
        navigation.canGoBack() && navigation.goBack();
      }
    },
  });

  const handleUpdate = handleSubmit(async data => {
    await mutateAsync({
      userId: authUser?.id || 0,
      name: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      username: data.username,
      email: data.email,
      password: data.password,
    });
  });

  return { control, isPending, handleUpdate };
};
