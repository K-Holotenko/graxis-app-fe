import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { LoginWithGoogleResponse } from './interfaces';

export const AuthService = {
  loginWithGoogleReq: async (): Promise<LoginWithGoogleResponse> => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const user = { email: result.user.email };
    return { user };
  },
  loginWithFacebookReq: async (): Promise<string | null> => null,

  loginWithAppleReq: async (): Promise<string | null> => null,
};
