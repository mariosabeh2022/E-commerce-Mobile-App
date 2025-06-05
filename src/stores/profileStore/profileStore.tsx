import {create} from 'zustand';
import {UserStore} from './profileStore.type';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        profileImage: '',
        createdAt: '',
      },
      setUser: user => set({user}),
      updateProfileImage: imageUri =>
        set(state => ({
          user: {
            ...state.user,
            profileImage: imageUri,
          },
        })),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
export default useUserStore;
