import { APP_CONFIGURATIONS } from '@/constants/appConfig';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: APP_CONFIGURATIONS.API_BASE_URL,
  timeout: APP_CONFIGURATIONS.REQUEST_TIME_OUT,
});

axiosInstance.interceptors.request.use(requestConfig => {
  /** Add token */
  const token = useAuthStore.getState().token;

  if (token) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  /**
   * Add logging
   */
  if (__DEV__) {
    console.log(
      requestConfig.method,
      ' ::: ',
      requestConfig.baseURL,
      requestConfig.url,
    );
  }

  /**
   * encryption, etc ....
   */

  /**
   * then return config
   */
  return requestConfig;
});

axiosInstance.interceptors.response.use(response => {
  /**
   * Decryption, etc ...
   */

  /**
   * Add logging
   */
  if (__DEV__) {
    console.log(response.config.method, ' ::: ', response.config.url);
    // console.log('Response Data: ', JSON.stringify(response.data, null, 2));
  }

  /**
   * then return response
   */
  return response;
});
