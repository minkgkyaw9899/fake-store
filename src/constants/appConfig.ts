import Config from 'react-native-config';

export const APP_CONFIGURATIONS = {
  API_BASE_URL: Config.API_BASE_URL || 'http://localhost:8000/api',
  THEME_STORE_ENCRYPTION_KEY: 'FakeStore2O25n0V!_th3m3',
  THEME_STORE_ID: 'FakeStore-theme-storage',
  USER_INFO_STORE_ENCRYPTION_KEY: 'FakeStor3_us3R0075',
  USER_STORE_ID: 'FakeStore-user-info-storage',
  REQUEST_TIME_OUT: 1000 * 60, // 1 min
  KEYCHAIN_TOKEN_SERVICE: 'com.fakestore.token_service',
};
