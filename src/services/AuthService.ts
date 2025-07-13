import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';

import {
  EMAIL_VERIFICATION_REDIRECT_LINK,
  GRAXIS_API_URL,
} from 'src/config/constants';
import { firebaseAuth } from 'src/config/firebase';

export const updateAuthTokenOnTheServer = async (
  token: string
): Promise<void> =>
  await axios.post(
    `${GRAXIS_API_URL}/auth/login`,
    { token },
    { withCredentials: true }
  );

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
  ): Promise<User | null> => {
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

  signOut: async () => {
    await signOut(firebaseAuth);
  },
};
