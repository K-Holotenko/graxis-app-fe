import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

import { firebaseAuth } from '../config/firebase';
import { EMAIL_VERIFICATION_REDIRECT_LINK } from 'config/constants';

export const AuthService = {
  loginWithEmail: async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user: User = userCredential.user;

      return user;
    } catch {
      //TODO. Add proper error handling later
      return null;
    }
  },

  registerWithEmail: async (
    email: string,
    password: string
  ): Promise<unknown> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      const actionCodeSettings = {
        url: EMAIL_VERIFICATION_REDIRECT_LINK,
        handleCodeInApp: true,
      };

      await sendEmailVerification(user, actionCodeSettings);

      return user;
    } catch {
      //TODO. Add proper error handling later
    }
  },

  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(firebaseAuth, provider);

      const user = userCredential.user;

      return user;
    } catch {
      //TODO. Add proper error handling later
    }
  },

  loginWithFacebook: async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(firebaseAuth, provider);

      const user = userCredential.user;

      return user;
    } catch {
      //TODO. Add proper error handling later
    }
  },

  signOut: async () => {
    try {
      await signOut(firebaseAuth);
    } catch {
      //TODO. Add proper error handling later
    }
  },
};
