import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { firebaseAuth } from '../config/firebase';
import { ROUTES } from 'router/routes';

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
      const actionCodeSettings = {
        url: `https://dev.graxis.net/${ROUTES.LOGIN}`,
        handleCodeInApp: true,
      };

      await sendEmailVerification(user, actionCodeSettings);

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

  signOut: async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error(error);
    }
  },
};
