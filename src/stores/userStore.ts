import { create } from 'zustand';

import {
  fetchUser,
  signUp,
  SignUpUser,
  updateUser,
  UpdateUserData,
} from 'src/services/UserService';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  activeAt: string;
  avatarUrl: string;
  email_verified: boolean;
}

export interface ContactInfoForm {
  email: string;
  phoneNumber: string;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  createUser: (
    user: SignUpUser,
    showError: (err: string) => void
  ) => Promise<void>;
  fetchUser: () => Promise<User>;
  resetUser: () => void;
  updateUser: (
    data: UpdateUserData,
    showError: (err: string) => void
  ) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,

  createUser: async (user, showError) => {
    set({ isLoading: true });
    try {
      const userData: User = await signUp(user);

      set({ user: userData, isLoading: false });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
      set({ isLoading: false });
    }
  },

  fetchUser: async () => {
    set({ isLoading: true });
    const userData: User = await fetchUser();

    set({ user: userData, isLoading: false });

    return userData;
  },

  resetUser: () => set({ user: null }),

  updateUser: async (data, showError) => {
    try {
      const updatedUser: User = await updateUser(data);

      set({ user: updatedUser });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
    }
  },
}));
