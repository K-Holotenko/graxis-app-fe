import { create } from 'zustand';

import { AuthService } from '../services/AuthService';
import { ConfirmationResult } from 'firebase/auth';

interface AuthState {
  isAuthorized: boolean;
  user: unknown;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;

  // user: User | null;
  confirmationResult: ConfirmationResult | null;
  error: string | null;
  loginWithPhoneNumber: (phoneNumber: string) => Promise<void>;
  verifyCode: (code: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: false,
  user: {},
  // user: null,
  confirmationResult: null,
  error: null,

  loginWithEmail: async (email: string, password: string) => {
    const response = await AuthService.loginWithEmail(email, password);

    set({ isAuthorized: !!response, user: response });
  },

  registerWithEmail: async (email: string, password: string) => {
    const response = await AuthService.registerWithEmail(email, password);

    set({ isAuthorized: !!response, user: response });
  },

  loginWithGoogle: async () => {
    const response = await AuthService.loginWithGoogle();

    set({ isAuthorized: !!response, user: response });
  },

  loginWithFacebook: async () => {
    const response = await AuthService.loginWithFacebook();

    set({ isAuthorized: !!response, user: response });
  },

  loginWithPhoneNumber: async (phoneNumber) => {
    try {
      const confirmationResult =
        await AuthService.loginWithPhoneNumber(phoneNumber);

      set({ confirmationResult });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  verifyCode: async (code) => {
    const { confirmationResult } = useAuthStore.getState();

    if (!confirmationResult) {
      set({ error: 'Confirmation result not found' });

      return;
    }

    try {
      const user = await AuthService.verifyCode(confirmationResult, code);

      set({ user, isAuthorized: true, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  // loginWithPhoneNumber: async (phone: string, code: string) => {
  //   try {
  //     const confirmationResult = await AuthService.loginWithPhoneNumber(phone);
  //     const user = await AuthService.verifyCode(confirmationResult, code);

  //     set({ isAuthorized: !!user, user });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },

  signOut: async () => {
    await AuthService.signOut();

    set({ isAuthorized: false, user: {} });
  },
}));
