import { Image } from 'antd';
import useToken from 'antd/es/theme/useToken';

import mapPinSrc from 'src/assets/icons/map-pin-icon.svg';
import mapPinLightSrc from 'src/assets/icons/map-pin-icon-light.svg';
import { IMAGE_DESCRIPTION } from 'src/config/constants';
import { theme } from 'src/config/theme';

export const MapPinIcon = () => {
  const [, token] = useToken();

  return (
    <Image
      src={token.colorText === theme.whiteColor ? mapPinLightSrc : mapPinSrc}
      alt={IMAGE_DESCRIPTION.LOGO}
      preview={false}
      className="map-pin-icon"
    />
  );
};
