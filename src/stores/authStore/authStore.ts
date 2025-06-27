import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';
import {AuthStoreProps} from './authStore.type';

const SecureStorage: StateStorage = {
  setItem: async (name, value) => {
    await RNSecureStorage.setItem(name, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  },
  getItem: async name => {
    const value = await RNSecureStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async name => {
    await RNSecureStorage.removeItem(name);
  },
};

const useAuthStore = create<AuthStoreProps>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (access, refresh) =>
        set(() => ({
          accessToken: access,
          refreshToken: refresh,
        })),
      clearToken: () => set({accessToken: null, refreshToken: null}),
      setIsHydrated: () => set({isStoreHydrated: true}),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => state => {
        state?.setIsHydrated();
      },
      storage: createJSONStorage(() => SecureStorage),
    },
  ),
);

export default useAuthStore;
export const authStore = useAuthStore;
