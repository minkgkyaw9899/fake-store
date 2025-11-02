import { useAuthStore } from '@/stores/useAuthStore';
import { getToken } from '@/utils/keyChainService';
import { useEffect, useState } from 'react';
import { useHandleTheme } from './useHandleTheme';

export const useRunOnStartupApp = () => {
  useHandleTheme();

  const [isAppReady, setIsAppReady] = useState(false);

  const setAuthUserToken = useAuthStore.use.setAuthUserToken();

  useEffect(() => {
    const settingUpToken = async () => {
      const existedToken = await getToken();

      if (existedToken) {
        setAuthUserToken(existedToken);
      }

      setIsAppReady(true);
    };

    settingUpToken();
  }, [setAuthUserToken]);

  return isAppReady;
};
