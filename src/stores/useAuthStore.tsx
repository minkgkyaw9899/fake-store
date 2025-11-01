import { create } from 'zustand/react';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from '@/utils/createSelectors';

type State = {
  isAuth: boolean;
};

type Action = {
  setIsAuth: (newStatus: boolean) => void;
};

const useAuthStoreBase = create<State & Action>()(
  immer(set => ({
    isAuth: false,
    setIsAuth: newStatus =>
      set(state => {
        state.isAuth = newStatus;
      }),
  })),
);

export const useAuthStore = createSelectors(useAuthStoreBase);
