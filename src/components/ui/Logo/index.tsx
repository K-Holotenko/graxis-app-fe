import { Image } from 'antd';

import logoSrc from 'assets/icons/logo.svg';
import { IMAGE_DESCRIPTION } from 'config/constants';

export const Logo = () => (
  <Image
    src={logoSrc}
    alt={IMAGE_DESCRIPTION.LOGO}
    preview={false}
    className="logo"
  />
);
