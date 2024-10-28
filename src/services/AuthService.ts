// import {
//   createUserWithEmailAndPassword,
//   FacebookAuthProvider,
//   GoogleAuthProvider,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from 'firebase/auth';

// import { firebaseAuth } from '../config/firebase';

// export const AuthService = {
//   loginWithEmail: async (email: string, password: string): Promise<unknown> => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         firebaseAuth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       return user;
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   registerWithEmail: async (
//     email: string,
//     password: string
//   ): Promise<unknown> => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         firebaseAuth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       return user;
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   loginWithGoogle: async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const userCredential = await signInWithPopup(firebaseAuth, provider);
//       const credential =
//         GoogleAuthProvider.credentialFromResult(userCredential);

//       console.log(userCredential, credential);

//       const user = userCredential.user;

//       return user;
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   loginWithFacebook: async () => {
//     try {
//       const provider = new FacebookAuthProvider();
//       const userCredential = await signInWithPopup(firebaseAuth, provider);
//       const credential =
//         FacebookAuthProvider.credentialFromResult(userCredential);

//       console.log(userCredential, credential);

//       const user = userCredential.user;

//       return user;
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   signOut: async () => {
//     try {
//       await signOut(firebaseAuth);
//     } catch (error) {
//       console.error(error);
//     }
//   },
// };

import {
  ConfirmationResult,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
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

  loginWithPhoneNumber: async (
    phoneNumber: string
  ): Promise<ConfirmationResult> => {
    // if (!window.recaptchaVerifier) {
    //   console.log('Recaptcha verifier not initialized');
    // }

    return await signInWithPhoneNumber(
      firebaseAuth,
      phoneNumber,
      window.recaptchaVerifier
    );
  },

  verifyCode: async (confirmationResult: ConfirmationResult, code: string) => {
    try {
      const result = await confirmationResult.confirm(code);

      return result.user;
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
