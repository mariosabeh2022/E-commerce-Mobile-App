import {create} from 'zustand';
import {UserStore} from './profileStore.type';
const useUserStore = create<UserStore>(set => ({
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
}));
export default useUserStore;
