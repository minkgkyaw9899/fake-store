import { API_LIST } from '@/constants/apiList';
import { httpClient } from '@/utils/httpClient';
import { LoginFormField } from '../schemas';

type Response = {
  token: string;
  userId: number;
};

export const login = async (requestData: LoginFormField) => {
  return await httpClient.post<LoginFormField, Response>(
    API_LIST.LOGIN,
    requestData,
  );
};
