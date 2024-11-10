import { create } from 'zustand';

import { AuthService } from '../services/AuthService';
import CookieService from 'services/CookieService';

interface AuthState {
  isAuthorized: boolean;
  emailToVerify: string | null;
  user: unknown;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  signOut: () => Promise<void>;
  setAuthorized: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: CookieService.hasCookie('accessToken'),
  user: null,
  emailToVerify: null,

  loginWithEmail: async (email: string, password: string) => {
    const response = await AuthService.loginWithEmail(email, password);
    const accessToken = await response?.getIdToken();

    if (accessToken) {
      CookieService.setCookie('accessToken', accessToken, 7);
      set({ isAuthorized: true, user: response });
    }
  },

  registerWithEmail: async (email: string, password: string) => {
    const response = await AuthService.registerWithEmail(email, password);

    set({ isAuthorized: !!response, user: response, emailToVerify: email });
  },

  loginWithGoogle: async () => {
    const response = await AuthService.loginWithGoogle();

    set({ isAuthorized: !!response, user: response });
  },

  loginWithFacebook: async () => {
    const response = await AuthService.loginWithFacebook();

    set({ isAuthorized: !!response, user: response });
  },

  signOut: async () => {
    await AuthService.signOut();

    set({ isAuthorized: false, user: {} });
  },

  setAuthorized: (state: boolean) => {
    set({ isAuthorized: state });
  },
}));
