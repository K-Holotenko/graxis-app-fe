import { useState } from 'react';
import { Badge } from 'antd';

import { NotificationIcon } from 'components/ui/NotificationIcon';

export const NotificationBadge = () => {
  const [hasNotifications] = useState(true);

  return (
    <Badge dot={hasNotifications}>
      <NotificationIcon />
    </Badge>
  );
};
