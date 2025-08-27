import { create } from 'zustand';

import {
  getAllNotifications,
  getAllUnreadNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from 'src/services/NotificationService';
import { socket } from 'src/sockets';
import { SocketEvent } from 'src/config/constants';

export enum NotificationType {
  NEW_BOOKING = 'NEW_BOOKING',
  NEW_MESSAGE = 'NEW_MESSAGE',
  NEW_PUBLICATION = 'NEW_PUBLICATION',
}

export interface Notification {
  id: string;
  createdAt: string;
  message: string;
  read: boolean;
  referenceBooking: boolean;
  referenceId: string;
  referencePublication: boolean;
  type: NotificationType;
  updatedAt: string;
  userId: string;
}

interface NotificationStore {
  notifications: Notification[] | null;
  isLoading: boolean;
  connectToNotificationUpdate: () => () => void;
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

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: null,
  isLoading: false,

  connectToNotificationUpdate: () => {
    const handler = (data: { notification: Notification }): void => {
      const notifications = get().notifications;

      if (!notifications) {
        return;
      }
      // TODO Ensure BE returns valid data shape
      set({ notifications: [data.notification, ...notifications] });
    };

    const events = [
      SocketEvent.BOOKING_STATUS_UPDATE,
      SocketEvent.CHAT_NEW_MASSAGE,
      SocketEvent.PUBLICATION_NEW,
    ];

    events.forEach((event) => socket.on(event, handler));

    return () => {
      events.forEach((event) => socket.off(event, handler));
    };
  },

  getAllNotifications: async (showError: (err: string) => void) => {
    set({ isLoading: true });

    try {
      const response = await getAllNotifications();

      set({ notifications: response });
    } catch {
      showError('Нотифікації наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isLoading: false });
    }
  },

  getAllUnreadNotifications: async (showError: (err: string) => void) => {
    set({ isLoading: true });

    try {
      const response = await getAllUnreadNotifications();

      set({ notifications: response });
    } catch {
      showError('Нотифікації наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isLoading: false });
    }
  },

  markAllNotificationsAsRead: async (showError: (err: string) => void) => {
    set({ isLoading: true });

    try {
      const response = await markAllNotificationsAsRead();

      set({ notifications: response });
    } catch {
      showError('Нотифікації наразі недоступні. Спробуйте ще раз');
    } finally {
      set({ isLoading: false });
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

    set({ isLoading: true });

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
      set({ isLoading: false });
    }
  },
}));
