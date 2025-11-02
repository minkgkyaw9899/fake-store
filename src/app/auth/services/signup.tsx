import { httpClient } from '@/utils/httpClient';
import { SignUpFormField } from '../schemas';
import { API_LIST } from '@/constants/apiList';

type Response = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export const signup = async (requestData: SignUpFormField) => {
  return await httpClient.post<SignUpFormField, Response>(
    API_LIST.USERS,
    requestData,
  );
};
