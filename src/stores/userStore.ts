import { create } from 'zustand';

import {
  fetchUser,
  signUp,
  SignUpUser,
  updateAvatar,
  updateUser,
  UpdateUserData,
} from 'src/services/UserService';

export interface User {
  id: string;
  name: string;
  surname: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  registrationDate: string;
  activeAt: string;
  avatarUrl: string;
  email_verified: boolean;
}

interface UserStore {
  user: User | null;
  createUser: (
    user: SignUpUser,
    showError: (err: string) => void
  ) => Promise<void>;
  resetUser: () => void;
  fetchUser: (showError: (err: string) => void) => Promise<void>;
  updateUser: (
    data: UpdateUserData
    // showError: (err: string) => void
  ) => Promise<void>;
  updateAvatar: (
    data: UpdateUserData,
    showError: (err: string) => void
  ) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  createUser: async (user, showError) => {
    try {
      const response = await signUp(user);
      const userData: User = await response.json();

      set({ user: userData });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
      throw new Error('Failed to create user');
    }
  },

  resetUser: () => set({ user: null }),

  fetchUser: async (showError) => {
    try {
      const response = await fetchUser();
      const userData: User = await response.json();

      set({ user: userData });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
      throw new Error('Failed to fetch user');
    }
  },

  updateUser: async (data) => {
    try {
      const response = await updateUser(data);
      const updatedUser: User = await response.json();

      set({ user: updatedUser });
    } catch {
      // showError('Щось пішло не так. Спробуйте ще раз');
      throw new Error('Failed to update user');
    }
  },

  updateAvatar: async (data, showError) => {
    try {
      const response = await updateAvatar(data);
      const updatedUser: User = await response.json();

      set({ user: updatedUser });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
      throw new Error('Failed to update avatar');
    }
  },
}));
