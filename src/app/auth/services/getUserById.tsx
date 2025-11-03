import { API_LIST } from '@/constants/apiList';
import { httpClient } from '@/utils/httpClient';

export type UserInfo = {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
};

export const getUserById = async (userId: number) => {
  return await httpClient.get<UserInfo>(`${API_LIST.USERS}/${userId}`);
};
