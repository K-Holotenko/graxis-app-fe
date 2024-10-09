import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import SocialMediaButton from '../../../../ui/SocialMediaButton';
import { ReactComponent as GoogleIcon } from '../../../../../assets/icons/google-icon.svg';

const provider = new GoogleAuthProvider();

const GoogleLoginButton: React.FC = () => {
  const onClick = (): void => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(token, user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return <SocialMediaButton icon={<GoogleIcon />} onClick={onClick} />;
};

export default GoogleLoginButton;
