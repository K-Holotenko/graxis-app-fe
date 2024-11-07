import { create } from 'zustand';

import { AuthService } from '../services/AuthService';
import { ConfirmationResult, User } from 'firebase/auth';

interface AuthState {
  isAuthorized: boolean;
  user: User | null | unknown;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  confirmationResult: ConfirmationResult | null;
  loginWithPhoneNumber: (phoneNumber: string) => Promise<void>;
  verifyCode: (code: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: false,
  user: null,
  confirmationResult: null,

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
    const confirmationResult =
      await AuthService.loginWithPhoneNumber(phoneNumber);

    set({ confirmationResult });
  },

  verifyCode: async (code) => {
    const { confirmationResult } = useAuthStore.getState() as AuthState;

    if (!confirmationResult) return;

    const user = await AuthService.verifyCode(confirmationResult, code);

    set({ user, isAuthorized: true });
  },

  signOut: async () => {
    await AuthService.signOut();

    set({ isAuthorized: false, user: {} });
  },
}));
