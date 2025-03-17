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
  isLoading: boolean;
  createUser: (
    user: SignUpUser,
    showError: (err: string) => void
  ) => Promise<void>;
  fetchUser: () => void;
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
    const response = await signUp(user);
    const userData: User = await response.json();

    if (!response.ok) {
      showError('Щось пішло не так. Спробуйте ще раз');
      set({ isLoading: false });
      throw new Error('Failed to create user');
    }

    set({ user: userData, isLoading: false });
  },

  fetchUser: async () => {
    set({ isLoading: true });
    const response = await fetchUser();
    const userData: User = await response.json();

    if (!response.ok) {
      set({ isLoading: false });
      throw new Error('Failed to fetch user');
    }

    set({ user: userData, isLoading: false });
  },

  resetUser: () => set({ user: null }),

  updateUser: async (data, showError) => {
    try {
      const response = await updateUser(data);
      const updatedUser: User = await response.json();

      set({ user: updatedUser });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
      throw new Error('Failed to update user');
    }
  },
}));
