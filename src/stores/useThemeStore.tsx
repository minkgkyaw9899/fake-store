import { create } from 'zustand/react';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { changeStorage, themeStorage } from '@/utils/mmkvStorage';
import { createSelectors } from '@/utils/createSelectors';

type State = {
  currentTheme: 'light' | 'dark' | 'system';
};

type Action = {
  changeCurrentTheme: (newTheme: State['currentTheme']) => void;
};

const useThemeStoreBase = create<State & Action>()(
  persist(
    immer(set => ({
      currentTheme: 'light',
      changeCurrentTheme: newTheme =>
        set(state => {
          state.currentTheme = newTheme;
        }),
    })),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => changeStorage(themeStorage)),
    },
  ),
);

export const useThemeStore = createSelectors(useThemeStoreBase);
