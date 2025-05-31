import {create} from 'zustand';
import {UserStore} from './profileStore.type';
import {persist} from 'zustand/middleware';
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
    },
  ),
);
export default useUserStore;
