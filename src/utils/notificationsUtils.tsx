import { Empty, Spin, MenuProps } from 'antd';
import { generatePath, Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import { Notification } from 'src/components/Notification';
import { ROUTES } from 'src/router/routes';
import {
  NotificationBase,
  Notification as NotificationType,
  NotificationTypeToTitle,
  NotificationTypeToMessage,
} from 'src/types';

import { formatDateToDDMMYYYY, formatTimeToHHMM } from './formatDate';

const buildNotificationLink = (notification: NotificationBase): string => {
  if (notification.referenceBooking) {
    return generatePath(ROUTES.BOOKING, {
      id: notification.referenceId,
      tab: 'details',
    });
  } else {
    return generatePath(ROUTES.PUBLICATION, { id: notification.referenceId });
  }
};

export const remapNotificationText = (
  notifications: NotificationBase[]
): NotificationType[] =>
  notifications.map((item) => ({
    id: item.id,
    createdAt: item.createdAt,
    time: formatTimeToHHMM(item.createdAt),
    date: formatDateToDDMMYYYY(item.createdAt),
    title: NotificationTypeToTitle[item.type],
    message: NotificationTypeToMessage[item.type],
    read: item.read,
    link: buildNotificationLink(item),
  }));

export const getNotificationMenu = (
  notifications: NotificationType[],
  handleNotificationClick: MenuProps['onClick'],
  isNotificationsLoading: boolean
): MenuProps => {
  if (notifications?.length === 0 && !isNotificationsLoading) {
    return {
      items: [
        {
          key: 'empty',
          label: (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Немає нових повідомлень"
              />
              <Link to={ROUTES.NOTIFICATIONS_BASE}>
                Показати всі повідомлення
              </Link>
            </div>
          ),
        },
      ],
    };
  }

  if (isNotificationsLoading) {
    return {
      items: [
        {
          key: 'loading',
          label: (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: '100%',
              }}
            >
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 36, color: '#003342' }}
                    spin
                  />
                }
              />
            </div>
          ),
        },
      ],
    };
  }

  return {
    items: notifications?.map((notification: NotificationType) => ({
      key: notification.id,
      label: (
        <Notification
          title={notification.title}
          description={notification.message}
          time={notification.time}
          date={notification.date}
          seen={notification.read}
          link={notification.link}
        />
      ),
    })),
    onClick: handleNotificationClick,
  };
};
