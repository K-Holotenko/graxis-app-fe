import { create } from 'zustand';

import { AuthService } from '../services/AuthService';

interface AuthState {
  isAuthorized: boolean;
  user: unknown;
  loginWithEmail: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: false,
  user: {},
  loginWithEmail: async (email: string, password: string) => {
    const response = await AuthService.loginWithEmail(email, password);

    set({ isAuthorized: !!response, user: response });
  },
}));
