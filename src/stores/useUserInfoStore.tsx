import { create } from 'zustand/react';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { changeStorage, userInfoStorage } from '@/utils/mmkvStorage';
import { createSelectors } from '@/utils/createSelectors';
import { UserInfo } from '@/app/auth/services/getUserById';

type State = {
  authUser: UserInfo | undefined;
};

type Action = {
  setAuthUser: (user: State['authUser']) => void;
};

const useUserStoreBase = create<State & Action>()(
  persist(
    immer(set => ({
      authUser: undefined,
      setAuthUser: user =>
        set(state => {
          state.authUser = user;
        }),
    })),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => changeStorage(userInfoStorage)),
    },
  ),
);

export const useUserStore = createSelectors(useUserStoreBase);
