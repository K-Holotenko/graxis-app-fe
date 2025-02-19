import { App } from 'antd';

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
}

interface Notification {
  openNotification: (
    type: NotificationType,
    message: string,
    description: string,
    btn?: React.ReactNode
  ) => void;
}

export const useNotification = (): Notification => {
  const { notification } = App.useApp();

  const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
    btn?: React.ReactNode
  ): void => {
    notification[type]({
      message,
      description,
      duration: 5,
      pauseOnHover: true,
      placement: 'bottomLeft',
      btn,
    });
  };

  return { openNotification };
};
