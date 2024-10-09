import React from 'react';

import SocialMediaButton from '../../../../ui/SocialMediaButton';
import { ReactComponent as AppleIcon } from '../../../../../assets/icons/apple-icon.svg';

const AppleLoginButton: React.FC = () => {
  const onClick = (): void => {
    console.log('Apple Login Button');
  };
  return <SocialMediaButton icon={<AppleIcon />} onClick={onClick} />;
};

export default AppleLoginButton;
