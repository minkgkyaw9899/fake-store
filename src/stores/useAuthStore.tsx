import { create } from 'zustand/react';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from '@/utils/createSelectors';

type State = {
  isAuth: boolean;
  token?: string;
};

type Action = {
  setAuthUserToken: (newToken: string) => void;
  reset: () => void;
};

const useAuthStoreBase = create<State & Action>()(
  immer(set => ({
    isAuth: false,
    setAuthUserToken: newToken =>
      set(state => {
        state.isAuth = true;
        state.token = newToken;
      }),
    reset: () =>
      set(state => {
        state.isAuth = false;
        state.token = undefined;
      }),
  })),
);

export const useAuthStore = createSelectors(useAuthStoreBase);
