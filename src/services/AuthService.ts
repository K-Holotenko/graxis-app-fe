import {
  ConfirmationResult,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

import { EMAIL_VERIFICATION_REDIRECT_LINK } from 'src/config/constants';
import { firebaseAuth } from 'src/config/firebase';

export const AuthService = {
  loginWithEmail: async (
    email: string,
    password: string
  ): Promise<User | null> => {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user: User = userCredential.user;

    return user;
  },

  registerWithEmail: async (
    email: string,
    password: string
  ): Promise<unknown> => {
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
  },

  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(firebaseAuth, provider);

    const user = userCredential.user;

    return user;
  },

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

  verifyCode: async (
    confirmationResult: ConfirmationResult,
    code: string
  ): Promise<User | undefined> => {
    const result = await confirmationResult.confirm(code);
    const user = result.user;

    return user;
  },

  signOut: async () => {
    await signOut(firebaseAuth);
  },
};
