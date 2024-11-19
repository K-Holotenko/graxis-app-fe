import { Image } from 'antd';

import notificationIconSrc from 'assets/icons/notification-icon.svg';
import { IMAGE_DESCRIPTION } from 'config/constants';

export const NotificationIcon = () => (
  <Image
    src={notificationIconSrc}
    alt={IMAGE_DESCRIPTION.LOGO}
    preview={false}
    className="notification-icon"
  />
);
