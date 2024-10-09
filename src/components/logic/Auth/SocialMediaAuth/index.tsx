import React from 'react';
import { Flex } from 'antd';

import GoogleLoginButton from './GoogleLoginButton';
import FacebookLoginButton from './FacebookLoginButton';
import AppleLoginButton from './AppleLoginButton';

const SocialMediaLogin: React.FC = () => {
  return (
    <Flex gap="large">
      <GoogleLoginButton />
      <FacebookLoginButton />
      <AppleLoginButton />
    </Flex>
  );
};

export default SocialMediaLogin;
