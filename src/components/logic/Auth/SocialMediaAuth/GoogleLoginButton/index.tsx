import React from 'react';

import SocialMediaButton from '../../../../ui/SocialMediaButton';
import { loginWithGoogle } from '../../../../../store/auth/authSlice';
import { ReactComponent as GoogleIcon } from '../../../../../assets/icons/google-icon.svg';
import { useAppDispatch } from '../../../../../hooks';

const GoogleLoginButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const onClick = async (): Promise<void> => {
    await dispatch(loginWithGoogle());
  };

  return <SocialMediaButton icon={<GoogleIcon />} onClick={onClick} />;
};

export default GoogleLoginButton;
