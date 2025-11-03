import { API_LIST } from '@/constants/apiList';
import { httpClient } from '@/utils/httpClient';

type Response = string[];

export const getCategories = async () => {
  return await httpClient.get<Response>(API_LIST.CATEGORIES);
};
