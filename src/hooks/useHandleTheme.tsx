import { useThemeStore } from '@/stores/useThemeStore';
import { useColorScheme } from 'nativewind';
import { useCallback, useEffect } from 'react';

export const useHandleTheme = () => {
  const currentTheme = useThemeStore.use.currentTheme();
  const changeCurrentTheme = useThemeStore.use.changeCurrentTheme();

  const { setColorScheme, colorScheme } = useColorScheme();

  const optimizedSwitchTheme = useCallback(() => {
    switch (currentTheme) {
      case 'light': {
        return setColorScheme('light');
      }
      case 'dark': {
        return setColorScheme('dark');
      }
      case 'system': {
        return setColorScheme('system');
      }
      default: {
        return setColorScheme('light');
      }
    }
  }, [currentTheme, setColorScheme]);

  const isDark =
    currentTheme === 'dark' ||
    (currentTheme === 'system' && colorScheme === 'dark');

  useEffect(() => {
    optimizedSwitchTheme();
  }, [optimizedSwitchTheme]);

  const changeDarkTheme = () => changeCurrentTheme('dark');
  const changeLightTheme = () => changeCurrentTheme('light');
  const changeSystemTheme = () => changeCurrentTheme('system');

  return {
    changeDarkTheme,
    changeLightTheme,
    changeSystemTheme,
    changeCurrentTheme,
    currentTheme,
    isDark,
  };
};
