import { MUTATION_KEYS } from '@/constants/queryKey';
import { useMutation } from '@tanstack/react-query';
import { getUserById } from '../services/getUserById';
import { useUserStore } from '@/stores/useUserInfoStore';

export const useGetAuthUserById = () => {
  const setAuthUser = useUserStore.use.setAuthUser();
  const { data, isSuccess, isPending, mutateAsync } = useMutation({
    mutationKey: [MUTATION_KEYS.AUTH_USER],
    mutationFn: async (userId: number) => {
      return await getUserById(userId);
    },
    onSuccess: res => {
      setAuthUser(res.data);
    },
  });

  return { data, isSuccess, isPending, mutateAsync };
};
