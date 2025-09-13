import { Spin } from 'antd';
import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { Notification } from 'src/components/Notification';
import { Card } from 'src/pages/UserProfilePage/children/Card';
import { useNotificationStore } from 'src/stores/notificationStore';
import { NotificationType, useNotification } from 'src/hooks/useNotification';

import styles from './styles.module.scss';

export const NotificationTab = () => {
  const {
    notifications,
    isAllNotificationsLoading,
    isUnreadNotificationsLoading,
    getAllNotifications,
    markNotificationAsRead,
  } = useNotificationStore();

  const { openNotification } = useNotification();

  const showError = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const handleMarkAllNotificationsAsRead = (id: string) => {
    markNotificationAsRead(id, showError);
  };

  useEffect(() => {
    getAllNotifications(showError);
  }, []);

  return (
    <Card>
      {isAllNotificationsLoading || isUnreadNotificationsLoading ? (
        <div className={styles.spinnerContainer}>
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 56, color: '#003342' }}
                spin
              />
            }
          />
        </div>
      ) : (
        <div className={styles.notificationsWrapper}>
          {notifications?.map((notification) => (
            <Notification
              key={notification.id}
              description={notification.message}
              time={notification.time}
              date={notification.date}
              seen={notification.read}
              title={notification.title}
              link={notification.link}
              onMarkAsRead={handleMarkAllNotificationsAsRead.bind(
                null,
                notification.id
              )}
            />
          ))}
        </div>
      )}
    </Card>
  );
};
