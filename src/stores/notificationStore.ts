import { create } from 'zustand';

import {
  getAllNotifications,
  getAllUnreadNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from 'src/services/NotificationService';
import { socket } from 'src/sockets';
import { SocketEvent } from 'src/config/constants';
import { Notification } from 'src/types/notifications';
import { remapNotificationText } from 'src/utils/notificationsUtils';

interface NotificationState {
  notifications: Notification[] | null;
  unreadNotifications: Notification[] | null;
  isAllNotificationsLoading: boolean;
  isUnreadNotificationsLoading: boolean;
  showBadge: boolean;
}

interface NotificationActions {
  subscribeToNotificationUpdate: () => () => void;
  getAllNotifications: (showError: (err: string) => void) => Promise<void>;
  getAllUnreadNotifications: (
    showError: (err: string) => void
  ) => Promise<void>;
  markAllNotificationsAsRead: (
    showError: (err: string) => void
  ) => Promise<void>;
  markNotificationAsRead: (
    id: string,
    showError: (err: string) => void
  ) => Promise<void>;
}

export const useNotificationStore = create<
  NotificationState & NotificationActions
>((set, get) => ({
  notifications: null,
  unreadNotifications: null,
  isAllNotificationsLoading: false,
  isUnreadNotificationsLoading: false,
  showBadge: false,

  subscribeToNotificationUpdate: () => {
    const handler = (): void => {
      set({ showBadge: true });
    };

    socket.on(SocketEvent.NOTIFICATION_NEW, handler);

    return () => {
      socket.off(SocketEvent.NOTIFICATION_NEW, handler);
    };
  },

  getAllNotifications: async (showError: (err: string) => void) => {
    set({ isAllNotificationsLoading: true });

    try {
      const response = await getAllNotifications();
      const notifications = remapNotificationText(response);

      set({ notifications });
    } catch {
      showError('Нотифікації наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isAllNotificationsLoading: false });
    }
  },

  getAllUnreadNotifications: async (showError: (err: string) => void) => {
    set({ isUnreadNotificationsLoading: true });

    try {
      const response = await getAllUnreadNotifications();
      const unreadNotifications = remapNotificationText(response);

      set({ unreadNotifications, showBadge: response.length > 0 });
    } catch {
      showError('Нотифікації наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isUnreadNotificationsLoading: false });
    }
  },

  markAllNotificationsAsRead: async (showError: (err: string) => void) => {
    set({ isAllNotificationsLoading: true });

    try {
      const response = await markAllNotificationsAsRead();
      const notifications = remapNotificationText(response);

      set({ notifications });
    } catch {
      showError('Нотифікації наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isAllNotificationsLoading: false });
    }
  },

  markNotificationAsRead: async (
    id: string,
    showError: (err: string) => void
  ) => {
    const notifications = get().notifications;

    if (!notifications) {
      return;
    }

    set({ isAllNotificationsLoading: true });

    try {
      await markNotificationAsRead(id);
      const index = notifications.findIndex(
        (notification) => notification.id === id
      );

      const updatedNotifications = [...notifications];

      updatedNotifications.splice(index, 1, {
        ...notifications[index],
        read: true,
      });

      set({ notifications: updatedNotifications });
    } catch {
      showError('Нотифікації наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isAllNotificationsLoading: false });
    }
  },
}));
