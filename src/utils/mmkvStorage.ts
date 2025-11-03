import { StateStorage } from 'zustand/middleware';
import { createMMKV, MMKV } from 'react-native-mmkv';
import { APP_CONFIGURATIONS } from '@/constants/appConfig';

export const themeStorage = createMMKV({
  encryptionKey: APP_CONFIGURATIONS.THEME_STORE_ENCRYPTION_KEY,
  id: APP_CONFIGURATIONS.THEME_STORE_ID,
});

export const userInfoStorage = createMMKV({
  encryptionKey: APP_CONFIGURATIONS.USER_INFO_STORE_ENCRYPTION_KEY,
  id: APP_CONFIGURATIONS.USER_STORE_ID,
});

export const changeStorage = (storage: MMKV): StateStorage => ({
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.remove(name);
  },
});
