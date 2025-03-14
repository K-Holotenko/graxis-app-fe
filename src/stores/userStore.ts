import { create } from 'zustand';

import { signUp, SignUpUser } from 'src/services/UserService';

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
}));
