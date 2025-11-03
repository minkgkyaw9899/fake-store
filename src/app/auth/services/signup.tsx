import { httpClient } from '@/utils/httpClient';
import { SignUpFormField } from '../schemas';
import { API_LIST } from '@/constants/apiList';
import { UserInfo } from './getUserById';

export const signup = async (requestData: SignUpFormField) => {
  return await httpClient.post<SignUpFormField, UserInfo>(
    API_LIST.USERS,
    requestData,
  );
};
