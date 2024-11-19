import { Image } from 'antd';

import mapPinSrc from 'assets/icons/map-pin-icon.svg';
import mapPinLightSrc from 'assets/icons/map-pin-icon-light.svg';

import { IMAGE_DESCRIPTION } from 'config/constants';
import useToken from 'antd/es/theme/useToken';
import { theme } from 'config/theme';
import { useEffect } from 'react';

export const MapPinIcon = () => {
  const [, token] = useToken();

  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <Image
      src={token.colorText === theme.whiteColor ? mapPinLightSrc : mapPinSrc}
      alt={IMAGE_DESCRIPTION.LOGO}
      preview={false}
      className="map-pin-icon"
    />
  );
};
