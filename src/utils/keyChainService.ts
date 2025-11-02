import * as KeyChain from 'react-native-keychain';
import { APP_CONFIGURATIONS } from '@/constants/appConfig';

export const saveToken = async (username: string, token: string) => {
  try {
    return await KeyChain.setGenericPassword(username, token, {
      service: APP_CONFIGURATIONS.KEYCHAIN_TOKEN_SERVICE,
    });
  } catch (error) {
    throw error;
  }
};

export const getToken = async () => {
  try {
    const credential = await KeyChain.getGenericPassword({
      service: APP_CONFIGURATIONS.KEYCHAIN_TOKEN_SERVICE,
    });

    if (credential) {
      return credential.password;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteToken = async () => {
  try {
    return await KeyChain.resetGenericPassword({
      service: APP_CONFIGURATIONS.KEYCHAIN_TOKEN_SERVICE,
    });
  } catch (error) {
    throw error;
  }
};
