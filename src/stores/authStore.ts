import { ConfirmationResult, User, AuthErrorCodes } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { create } from 'zustand';

import { AuthService } from 'src/services/AuthService';
import CookieService from 'src/services/CookieService';

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
  loginWithPhoneNumber: (
    phoneNumber: string,
    showError: (err: string) => void
  ) => Promise<void>;
  verifyCode: (code: string, showError: (err: string) => void) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: CookieService.hasCookie('accessToken'),
  isLoading: false,
  user: null,
  confirmationResult: null,
  emailToVerify: null,

  loginWithEmail: async (email, password, showError) => {
    set({ isLoading: true });
    try {
      const response = await AuthService.loginWithEmail(email, password);
      const accessToken = await response?.getIdToken();

      if (accessToken) {
        CookieService.setCookie('accessToken', accessToken);
        set({ isAuthorized: true, user: response, isLoading: false });
      }
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
      const accessToken = await response?.getIdToken();

      if (accessToken) {
        CookieService.setCookie('accessToken', accessToken);
        set({
          isAuthorized: !!response,
          user: response,
          emailToVerify: email,
          isLoading: false,
        });
      }
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
        const accessToken = await user.getIdToken();

        CookieService.setCookie('accessToken', accessToken);
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

  loginWithPhoneNumber: async (phoneNumber, showError) => {
    set({ isLoading: true });
    try {
      const confirmationResult =
        await AuthService.loginWithPhoneNumber(phoneNumber);

      set({ confirmationResult, isLoading: false });
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
        set({ isLoading: false });
        throw err;
      }
    }
  },

  verifyCode: async (code, showError) => {
    set({ isLoading: true });
    try {
      const { confirmationResult } = useAuthStore.getState() as AuthState;

      if (!confirmationResult) return;

      const user = await AuthService.verifyCode(confirmationResult, code);

      if (user) {
        const accessToken = await user.getIdToken();

        CookieService.setCookie('accessToken', accessToken);
        set({ user, isAuthorized: true, isLoading: false });
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
        set({ isLoading: false });
        throw err;
      }
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
