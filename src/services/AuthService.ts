/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConfirmationResult,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
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
<<<<<<< HEAD
      // TODO Add error handling
=======
      //TODO. Add proper error handling later
      return null;
>>>>>>> dev
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
<<<<<<< HEAD
      // TODO Add error handling
=======
      //TODO. Add proper error handling later
>>>>>>> dev
    }
  },

  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(firebaseAuth, provider);

      const user = userCredential.user;

      return user;
    } catch {
<<<<<<< HEAD
      // TODO Add error handling
=======
      //TODO. Add proper error handling later
>>>>>>> dev
    }
  },

  loginWithFacebook: async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(firebaseAuth, provider);

      const user = userCredential.user;

      return user;
    } catch {
<<<<<<< HEAD
      // TODO Add error handling
=======
      //TODO. Add proper error handling later
>>>>>>> dev
    }
  },

  // TODO Handle different types of authentication errors
  loginWithPhoneNumber: async (
    phoneNumber: string
  ): Promise<ConfirmationResult | undefined> => {
    const confirmationResult = await signInWithPhoneNumber(
      firebaseAuth,
      phoneNumber,
      window.recaptchaVerifier
    );

    return confirmationResult;
  },

  // TODO Handle different types of authentication errors
  verifyCode: async (
    confirmationResult: ConfirmationResult,
    code: string
  ): Promise<User | undefined> => {
    const result = await confirmationResult.confirm(code);
    const user = result.user;

    return user;
  },

  signOut: async () => {
    try {
      await signOut(firebaseAuth);
    } catch {
<<<<<<< HEAD
      // TODO Add error handling
=======
      //TODO. Add proper error handling later
>>>>>>> dev
    }
  },
};
