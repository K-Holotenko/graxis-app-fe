import React from 'react';

import SocialMediaButton from '../../../../ui/SocialMediaButton';
import { ReactComponent as FacebookIcon } from '../../../../../assets/icons/facebook-icon.svg';

const FacebookLoginButton: React.FC = () => {
  const onClick = (): void => {
    console.log('Facebook Login Button');
  };
  return <SocialMediaButton icon={<FacebookIcon />} onClick={onClick} />;
};

export default FacebookLoginButton;
