import {
  ConfirmationResult,
  User,
  AuthErrorCodes,
  onIdTokenChanged,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { create } from 'zustand';

import { AuthService } from 'src/services/AuthService';
import CookieService from 'src/services/CookieService';
import { firebaseAuth } from 'src/config/firebase';

// List of errors visit https://firebase.google.com/docs/auth/admin/errors
const firebaseAuthErrorCodes: { [key: string]: string } = {
  [AuthErrorCodes.INVALID_IDP_RESPONSE]: 'Неправильний логін або пароль',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Акаунт з таким email вже зареєстровано',
  [AuthErrorCodes.INVALID_CODE]: 'Невалідний код',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
    'Забагато спроб. Спробуйте пізніше',
};

const DEFAULT_ERROR_MESSAGE = 'Щось пішло не так. Спробуйте ще раз';

export type AuthUser = (User & { displayName?: string }) | unknown;
interface AuthState {
  isAuthorized: boolean;
  user: AuthUser | null;
  emailToVerify: string | null;
  isLoading: boolean;
  initializeAuthListener: () => () => void;
  loginWithEmail: (
    email: string,
    password: string,
    showError: (err: string) => void
  ) => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    showError: (err: string) => void
  ) => Promise<void>;
  loginWithGoogle: (
    showError: (err: string) => void
  ) => Promise<AuthUser | void>;
  signOut: (showError: (err: string) => void) => Promise<void>;
  setAuthorized: (state: boolean) => void;
  confirmationResult: ConfirmationResult | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: CookieService.hasCookie('accessToken'),
  isLoading: false,
  user: null,
  confirmationResult: null,
  emailToVerify: null,

  initializeAuthListener: () => {
    set({ isLoading: true });
    const unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
      if (user) {
        const token = await user.getIdToken();

        CookieService.setCookie('accessToken', token, {
          path: '/',
          maxAge: 3600,
          sameSite: 'Lax',
          secure: true,
          domain: 'graxis.net',
        });

        set({ isAuthorized: true, user, isLoading: false });
      } else {
        CookieService.deleteCookie('accessToken');
        set({ isAuthorized: false, user: null, isLoading: false });
      }
    });

    return unsubscribe;
  },

  loginWithEmail: async (email, password, showError) => {
    set({ isLoading: true });
    try {
      const response = await AuthService.loginWithEmail(email, password);

      set({ isAuthorized: true, user: response, isLoading: false });
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
        throw err;
      }
      set({ isLoading: false });
    }
  },

  registerWithEmail: async (email, password, showError) => {
    set({ isLoading: true });
    try {
      const response = await AuthService.registerWithEmail(email, password);

      set({
        isAuthorized: !!response,
        user: response,
        emailToVerify: email,
        isLoading: false,
      });
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
      }
      set({ isLoading: false });
      throw err;
    }
  },

  loginWithGoogle: async (showError) => {
    set({ isLoading: true });
    try {
      const user = await AuthService.loginWithGoogle();

      if (user) {
        set({ isAuthorized: true, user, isLoading: false });

        return user;
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
      }
      set({ isLoading: false });
      throw err;
    }
  },

  signOut: async (showError) => {
    try {
      await AuthService.signOut();

      CookieService.deleteCookie('accessToken');
      set({ isAuthorized: false, user: {} });
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
        throw err;
      }
    }
  },

  setAuthorized: (state: boolean) => {
    set({ isAuthorized: state });
  },
}));
