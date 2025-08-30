import {
  ConfirmationResult,
  AuthErrorCodes,
  onAuthStateChanged,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import { create } from 'zustand';
import axios from 'axios';

import {
  AuthService,
  updateAuthTokenOnTheServer,
} from 'src/services/AuthService';
import { firebaseAuth } from 'src/config/firebase';
import { fetchUser, signUp, updateUser } from 'src/services/UserService';
import { SignUpUser, UpdateUserData, User, AuthUser } from 'src/types';

// List of errors visit https://firebase.google.com/docs/auth/admin/errors
const firebaseAuthErrorCodes: { [key: string]: string } = {
  [AuthErrorCodes.INVALID_IDP_RESPONSE]: 'Неправильний логін або пароль',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Акаунт з таким email вже зареєстровано',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
    'Забагато спроб. Спробуйте пізніше',
};

const DEFAULT_ERROR_MESSAGE = 'Щось пішло не так. Спробуйте ще раз';

interface AuthState {
  user: User | null;
  emailToVerify: string | null;
  isLoading: boolean;
  isAppInitializing: boolean;
  fetchUser: () => Promise<void>;
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
  signOut: (showError?: (err: string) => void) => Promise<void>;
  createUser: (
    user: SignUpUser,
    showError: (err: string) => void
  ) => Promise<void>;
  updateUser: (
    data: UpdateUserData,
    showError: (err: string) => void
  ) => Promise<void>;
  confirmationResult: ConfirmationResult | null;
  updateAuthTokenOnTheServer: (
    token: string,
    showError: (err: string) => void
  ) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  isAppInitializing: true,
  user: null,
  confirmationResult: null,
  emailToVerify: null,

  fetchUser: async () => {
    set({ isLoading: true });
    const firebaseUser = firebaseAuth.currentUser;
    const appUser = await fetchUser();

    if (appUser && firebaseUser) {
      set({
        isLoading: false,
        isAppInitializing: false,
        user: appUser,
      });
    } else {
      set({ isLoading: false, user: null });
    }
  },

  updateAuthTokenOnTheServer: async (
    token: string,
    showError: (err: string) => void
  ) => {
    set({ isLoading: true });
    try {
      await updateAuthTokenOnTheServer(token);
    } catch {
      showError('Не вдалося оновити токен. Спробуйте ще раз');
    } finally {
      set({ isLoading: false });
    }
  },

  initializeAuthListener: () => {
    set({ isAppInitializing: true }); // Use a separate flag for initial app load

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken(true);

          await updateAuthTokenOnTheServer(token);

          const appUser = await fetchUser();

          // This is the success path: User exists in Firebase AND our DB.
          set({
            isLoading: false,
            isAppInitializing: false,
            user: appUser,
          });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            // This is a NEW USER. They are authenticated with Firebase but have no profile yet.
            // Keep them unauthorized, with no local user object.
            set({
              user: null,
              isLoading: false,
              isAppInitializing: false,
            });
          } else {
            // This is a REAL error (e.g., server is down, network error).
            // For these cases, signing out is the safe action.
            await AuthService.signOut();
            set({
              user: null,
              isLoading: false,
              isAppInitializing: false,
            });
          }
        }
      } else {
        set({
          user: null,
          isLoading: false,
          isAppInitializing: false,
        });
      }
    });

    return unsubscribe;
  },

  createUser: async (user, showError) => {
    set({ isLoading: true });
    try {
      const userData: User = await signUp(user);

      set({ user: userData });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (data, showError) => {
    try {
      const updatedUser: User = await updateUser(data);

      set({ user: updatedUser });
    } catch {
      showError('Щось пішло не так. Спробуйте ще раз');
    }
  },

  loginWithEmail: async (email, password, showError) => {
    set({ isLoading: true });
    try {
      await AuthService.loginWithEmail(email, password);

      set({ isLoading: false });
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
      await AuthService.registerWithEmail(email, password);

      set({
        emailToVerify: email,
        isLoading: false,
      });
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
      }
      set({ isLoading: false, isAppInitializing: false });
      throw err;
    }
  },

  loginWithGoogle: async (showError) => {
    set({ isLoading: true });
    try {
      const user = await AuthService.loginWithGoogle();

      set({ isLoading: false });

      return user;
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
      }
      set({ isLoading: false, isAppInitializing: false });
      throw err;
    }
  },

  signOut: async (showError) => {
    try {
      await AuthService.signOut();

      set({ user: null });
    } catch (err) {
      if (err instanceof FirebaseError) {
        showError?.(firebaseAuthErrorCodes[err.code] || DEFAULT_ERROR_MESSAGE);
        throw err;
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
