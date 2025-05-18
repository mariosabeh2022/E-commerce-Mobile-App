interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  createdAt: string;
}

export type UserStore = {
  user: User;
  setUser: (user: User) => void;
  updateProfileImage: (imagePath: string) => void;
};
