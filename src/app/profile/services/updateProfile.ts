import { httpClient } from '@/utils/httpClient';
import { API_LIST } from '@/constants/apiList';
import { UserInfo } from '@/app/auth/services/getUserById';

export const updateProfile = async (
  request: Partial<UserInfo>,
  userId: number,
) => {
  return await httpClient.update<Partial<UserInfo>, UserInfo>(
    `${API_LIST.USERS}/${userId}`,
    request,
  );
};
