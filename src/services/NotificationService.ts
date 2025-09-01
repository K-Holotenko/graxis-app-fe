import { NotificationBase } from 'src/types';

import { api } from './api';

export const getAllNotifications = async (): Promise<NotificationBase[]> => {
  const response = await api.get(`/notifications/all`);

  return response.data;
};

export const getAllUnreadNotifications = async (): Promise<
  NotificationBase[]
> => {
  const response = await api.get(`/notifications/all-unread`);

  return response.data;
};

export const markAllNotificationsAsRead = async (): Promise<
  NotificationBase[]
> => {
  const response = await api.post(`/notifications/mark-all-read`);

  return response.data;
};

export const markNotificationAsRead = async (
  id: string
): Promise<NotificationBase> => {
  const response = await api.post(`/notifications/${id}/mark-read`);

  return response.data;
};
