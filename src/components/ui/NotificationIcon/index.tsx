import { Image } from 'antd';

import notificationIconSrc from 'src/assets/icons/notification-icon.svg';
import { IMAGE_DESCRIPTION } from 'src/config/constants';

export const NotificationIcon = () => (
  <Image
    src={notificationIconSrc}
    alt={IMAGE_DESCRIPTION.LOGO}
    preview={false}
    className="notification-icon"
  />
);
