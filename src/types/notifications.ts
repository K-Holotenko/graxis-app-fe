export enum NotificationType {
  NEW_BOOKING = 'NEW_BOOKING',
  NEW_MESSAGE = 'NEW_MESSAGE',
  STATUS_UPDATE = 'STATUS_UPDATE',
  NEW_PUBLICATION = 'NEW_PUBLICATION',
}

export const NotificationTypeToTitle: Record<NotificationType, string> = {
  [NotificationType.NEW_BOOKING]: 'Новий запит на оренду',
  [NotificationType.NEW_MESSAGE]: 'Отримано нове повідомлення',
  [NotificationType.STATUS_UPDATE]: 'Статус бронювання оновлено',
  [NotificationType.NEW_PUBLICATION]: 'Створена нова публікація',
};

export const NotificationTypeToMessage: Record<NotificationType, string> = {
  [NotificationType.NEW_BOOKING]: 'Переглянути запит на публікацію',
  [NotificationType.NEW_MESSAGE]: 'Перегляньте чат бронювання',
  [NotificationType.STATUS_UPDATE]: 'Перегляньте статус бронювання',
  [NotificationType.NEW_PUBLICATION]: 'Переглянути публікацію',
};

export interface NotificationBase {
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

export interface Notification {
  id: string;
  time: string;
  date: string;
  title: string;
  message: string;
  read: boolean;
  link: string;
}
