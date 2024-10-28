// import { create } from 'zustand';

// import { AuthService } from '../services/AuthService';

// interface AuthState {
//   isAuthorized: boolean;
//   user: unknown;
//   loginWithEmail: (email: string, password: string) => Promise<void>;
//   registerWithEmail: (email: string, password: string) => Promise<void>;
//   loginWithGoogle: () => Promise<void>;
//   loginWithFacebook: () => Promise<void>;
//   signOut: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   isAuthorized: false,
//   user: {},

//   loginWithEmail: async (email: string, password: string) => {
//     const response = await AuthService.loginWithEmail(email, password);

//     set({ isAuthorized: !!response, user: response });
//   },

//   registerWithEmail: async (email: string, password: string) => {
//     const response = await AuthService.registerWithEmail(email, password);

//     set({ isAuthorized: !!response, user: response });
//   },

//   loginWithGoogle: async () => {
//     const response = await AuthService.loginWithGoogle();

//     set({ isAuthorized: !!response, user: response });
//   },

//   loginWithFacebook: async () => {
//     const response = await AuthService.loginWithFacebook();

//     set({ isAuthorized: !!response, user: response });
//   },

//   signOut: async () => {
//     await AuthService.signOut();

//     set({ isAuthorized: false, user: {} });
//   },
// }));

import { create } from 'zustand';

import { AuthService } from '../services/AuthService';

interface AuthState {
  isAuthorized: boolean;
  user: unknown;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithPhoneNumber: (phone: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: false,
  user: {},

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

  loginWithPhoneNumber: async (phone: string, code: string) => {
    const confirmationResult = await AuthService.loginWithPhoneNumber(phone);
    const user = await AuthService.verifyCode(confirmationResult, code);

    set({ isAuthorized: !!user, user });
  },

  signOut: async () => {
    await AuthService.signOut();

    set({ isAuthorized: false, user: {} });
  },
}));
