import { StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import { APP_CONFIGURATIONS } from '@/constants/appConfig';

const themeStorage = createMMKV({
  encryptionKey: APP_CONFIGURATIONS.THEME_STORE_ENCRYPTION_KEY,
  id: APP_CONFIGURATIONS.THEME_STORE_ID,
});

export const zustandThemeStorage: StateStorage = {
  setItem: (name, value) => {
    return themeStorage.set(name, value);
  },
  getItem: name => {
    const value = themeStorage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return themeStorage.remove(name);
  },
};
