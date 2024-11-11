import {
  ConfirmationResult,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

import { firebaseAuth } from '../config/firebase';

export const AuthService = {
  loginWithEmail: async (email: string, password: string): Promise<unknown> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      return user;
    } catch (error) {
      console.error(error);
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

      return user;
    } catch (error) {
      console.error(error);
    }
  },

  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const credential =
        GoogleAuthProvider.credentialFromResult(userCredential);

      console.log(userCredential, credential);

      const user = userCredential.user;

      return user;
    } catch (error) {
      console.error(error);
    }
  },

  loginWithFacebook: async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(firebaseAuth, provider);
      const credential =
        FacebookAuthProvider.credentialFromResult(userCredential);

      console.log(userCredential, credential);

      const user = userCredential.user;

      return user;
    } catch (error) {
      console.error(error);
    }
  },

  // TODO
  // Handle different types of authentication errors
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

  // TODO
  // Handle different types of authentication errors
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
    } catch (error) {
      console.error(error);
    }
  },
};
