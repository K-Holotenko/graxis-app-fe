import { signInWithEmailAndPassword } from 'firebase/auth';

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
      throw error;
    }
  },
};
