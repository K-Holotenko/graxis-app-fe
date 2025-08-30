import { ButtonTypes } from 'src/config/constants';
import { NotificationType } from 'src/hooks/useNotification';
import { BookingStatus } from 'src/types';
import { ROUTES } from 'src/router/routes';
import { paymentTransaction, submitFeedback } from 'src/services/Booking';

export enum UserRole {
  RENTER = 'RENTER',
  OWNER = 'OWNER',
}

export interface BookingAction {
  id: string;
  label: string;
  type: ButtonTypes;
  action: (
    bookingId: string,
    navigate?: (path: string) => void,
    rating?: number,
    feedback?: string,
    publicationTitle?: string,
    openNotification?: (
      type: NotificationType,
      title: string,
      message: string
    ) => void
  ) => Promise<void>;
}

export type BookingDialogConfig = {
  [K in BookingStatus]: {
    [R in UserRole]: BookingAction[];
  };
};

export const bookingDialogConfig = (
  updateBookingStatus: (
    bookingId: string,
    status: BookingStatus
  ) => Promise<void>
): Omit<BookingDialogConfig, BookingStatus.BOOKED> => ({
  [BookingStatus.PENDING]: {
    [UserRole.RENTER]: [
      {
        id: 'cancel',
        label: 'Скасувати запит',
        type: ButtonTypes.default,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.CANCELLED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Запит скасовано',
              'Бронювання було скасовано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'cancel',
        label: 'Відхилити запит',
        type: ButtonTypes.default,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.CANCELLED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Запит відхилено',
              'Запит на бронювання відхилено'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
      {
        id: 'confirm',
        label: 'Підтвердити запит',
        type: ButtonTypes.primary,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.CONFIRMED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Запит підтверджено',
              'Бронювання підтверджено'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
    ],
  },
  [BookingStatus.CONFIRMED]: {
    [UserRole.RENTER]: [
      {
        id: 'cancel',
        label: 'Скасувати',
        type: ButtonTypes.default,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.CANCELLED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Бронювання скасовано',
              'Бронювання було скасовано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
      {
        id: 'pay',
        label: 'Оплатити',
        type: ButtonTypes.primary,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await paymentTransaction(bookingId);
            await updateBookingStatus(bookingId, BookingStatus.PAID);
            openNotification?.(
              NotificationType.SUCCESS,
              'Оплату проведено',
              'Статус бронювання оновлено на «Оплачено»'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося провести оплату'
            );
          }
        },
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'cancel',
        label: 'Скасувати',
        type: ButtonTypes.default,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.CANCELLED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Бронювання скасовано',
              'Бронювання було скасовано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
    ],
  },
  [BookingStatus.PAID]: {
    [UserRole.RENTER]: [
      {
        id: 'cancel',
        label: 'Скасувати',
        type: ButtonTypes.default,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.CANCELLED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Бронювання скасовано',
              'Бронювання було скасовано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
      {
        id: 'confirm-return',
        label: 'Підтвердити отримання',
        type: ButtonTypes.primary,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.IN_PROGRESS);
            openNotification?.(
              NotificationType.SUCCESS,
              'Отримання підтверджено',
              'Статус бронювання оновлено'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'cancel',
        label: 'Скасувати',
        type: ButtonTypes.default,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.CANCELLED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Бронювання скасовано',
              'Бронювання було скасовано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
    ],
  },
  [BookingStatus.IN_PROGRESS]: {
    [UserRole.RENTER]: [],
    [UserRole.OWNER]: [
      {
        id: 'confirm-return',
        label: 'Підтвердити повернення',
        type: ButtonTypes.primary,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await updateBookingStatus(bookingId, BookingStatus.RETURNED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Повернення підтверджено',
              'Статус бронювання оновлено'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося оновити статус бронювання'
            );
          }
        },
      },
    ],
  },
  [BookingStatus.RETURNED]: {
    [UserRole.RENTER]: [
      {
        id: 'rate',
        label: 'Залишити відгук',
        type: ButtonTypes.primary,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          rating?: number,
          feedback?: string,
          publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await submitFeedback(
              bookingId,
              publicationTitle!,
              rating!,
              feedback!
            );
            await updateBookingStatus(bookingId, BookingStatus.RENTER_RATED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Дякуємо за відгук!',
              'Відгук успішно надіслано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося надіслати відгук'
            );
          }
        },
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'rate',
        label: 'Залишити відгук',
        type: ButtonTypes.primary,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          rating?: number,
          feedback?: string,
          publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await submitFeedback(
              bookingId,
              publicationTitle!,
              rating!,
              feedback!
            );
            await updateBookingStatus(bookingId, BookingStatus.OWNER_RATED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Дякуємо за відгук!',
              'Відгук успішно надіслано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося надіслати відгук'
            );
          }
        },
      },
    ],
  },
  [BookingStatus.OWNER_RATED]: {
    [UserRole.RENTER]: [
      {
        id: 'rate',
        label: 'Залишити відгук',
        type: ButtonTypes.primary,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          rating?: number,
          feedback?: string,
          publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await submitFeedback(
              bookingId,
              publicationTitle!,
              rating!,
              feedback!
            );
            await updateBookingStatus(bookingId, BookingStatus.RATED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Дякуємо за відгук!',
              'Відгук успішно надіслано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося надіслати відгук'
            );
          }
        },
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'return-to-publications',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: async (
          _bookingId: string,
          navigate?: (path: string) => void
        ) => {
          navigate?.(ROUTES.SEARCH_RESULTS);
        },
      },
    ],
  },
  [BookingStatus.RENTER_RATED]: {
    [UserRole.RENTER]: [
      {
        id: 'return-to-publications',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: async (
          _bookingId: string,
          navigate?: (path: string) => void
        ) => {
          navigate?.(ROUTES.SEARCH_RESULTS);
        },
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'rate',
        label: 'Залишити відгук',
        type: ButtonTypes.primary,
        action: async (
          bookingId: string,
          _navigate?: (path: string) => void,
          rating?: number,
          feedback?: string,
          publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          try {
            await submitFeedback(
              bookingId,
              publicationTitle!,
              rating!,
              feedback!
            );
            await updateBookingStatus(bookingId, BookingStatus.RATED);
            openNotification?.(
              NotificationType.SUCCESS,
              'Дякуємо за відгук!',
              'Відгук успішно надіслано'
            );
          } catch {
            openNotification?.(
              NotificationType.ERROR,
              'Помилка',
              'Не вдалося надіслати відгук'
            );
          }
        },
      },
    ],
  },
  [BookingStatus.CANCELLED]: {
    [UserRole.RENTER]: [
      {
        id: 'return-to-publications',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: async (
          _bookingId: string,
          navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          navigate?.(ROUTES.SEARCH_RESULTS);
          openNotification?.(
            NotificationType.SUCCESS,
            'Бронювання успішно скасовано',
            'Щоб створити нове бронювання, перейдіть на сторінку публікації'
          );
        },
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'return-to-publications',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: async (
          _bookingId: string,
          navigate?: (path: string) => void,
          _rating?: number,
          _feedback?: string,
          _publicationTitle?: string,
          openNotification?: (
            type: NotificationType,
            title: string,
            message: string
          ) => void
        ) => {
          navigate?.(ROUTES.SEARCH_RESULTS);
          openNotification?.(
            NotificationType.SUCCESS,
            'Бронювання успішно скасовано',
            'Щоб створити нове бронювання, перейдіть на сторінку публікації'
          );
        },
      },
    ],
  },
  [BookingStatus.COMPLETED]: {
    [UserRole.RENTER]: [],
    [UserRole.OWNER]: [],
  },
  [BookingStatus.RATED]: {
    [UserRole.RENTER]: [],
    [UserRole.OWNER]: [],
  },
});

// Helper function to get user role
export const getUserRole = (
  booking: { owner: { id: string }; renterId: string } | null,
  userId: string | undefined
): UserRole => {
  if (!booking || !userId) return UserRole.RENTER;

  return booking.owner.id === userId ? UserRole.OWNER : UserRole.RENTER;
};

// Helper function to get current actions
export const getCurrentActions = (
  bookingStatus: Exclude<BookingStatus, BookingStatus.BOOKED> | null,
  userRole: UserRole,
  updateBookingStatus: (
    bookingId: string,
    status: BookingStatus
  ) => Promise<void>
): BookingAction[] => {
  if (!bookingStatus) return [];

  const statusConfig = bookingDialogConfig(updateBookingStatus)[bookingStatus];

  return statusConfig ? statusConfig[userRole] : [];
};
