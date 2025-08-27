import { Notification } from 'src/stores/notificationStore';

import { api } from './api';

export const getAllNotifications = async (): Promise<Notification[]> => {
  const response = await api.get(`/notifications/all`);

  return response.data;
};

export const getAllUnreadNotifications = async (): Promise<Notification[]> => {
  const response = await api.get(`/notifications/all-unread`);

  return response.data;
};

export const markAllNotificationsAsRead = async (): Promise<Notification[]> => {
  const response = await api.post(`/notifications/mark-all-read`);

  return response.data;
};

export const markNotificationAsRead = async (
  id: string
): Promise<Notification> => {
  const response = await api.post(`/notifications/${id}/mark-read`);

  return response.data;
};
