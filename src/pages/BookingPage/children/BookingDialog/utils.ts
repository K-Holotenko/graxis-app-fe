import { ButtonTypes } from 'src/config/constants';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking';
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
    feedback?: string
  ) => void;
  isVisible: boolean;
  isDisabled?: boolean;
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
        action: (bookingId: string) => {
          updateBookingStatus(bookingId, BookingStatus.CANCELLED);
        },
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'cancel',
        label: 'Відхилити запит',
        type: ButtonTypes.default,
        action: (bookingId: string) => {
          updateBookingStatus(bookingId, BookingStatus.CANCELLED);
        },
        isVisible: true,
      },
      {
        id: 'confirm',
        label: 'Підтвердити запит',
        type: ButtonTypes.primary,
        action: (bookingId: string) => {
          updateBookingStatus(bookingId, BookingStatus.CONFIRMED);
        },
        isVisible: true,
      },
    ],
  },
  [BookingStatus.CONFIRMED]: {
    [UserRole.RENTER]: [
      {
        id: 'cancel',
        label: 'Скасувати',
        type: ButtonTypes.default,
        action: async (bookingId: string) => {
          await paymentTransaction(bookingId);
          updateBookingStatus(bookingId, BookingStatus.CANCELLED);
        },
        isVisible: true,
      },
      {
        id: 'pay',
        label: 'Оплатити',
        type: ButtonTypes.primary,
        action: (bookingId: string) => {
          paymentTransaction(bookingId);
          updateBookingStatus(bookingId, BookingStatus.PAID);
        },
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'cancel',
        label: 'Скасувати',
        type: ButtonTypes.default,
        action: (bookingId: string) => {
          updateBookingStatus(bookingId, BookingStatus.CANCELLED);
        },
        isVisible: true,
      },
    ],
  },
  [BookingStatus.PAID]: {
    [UserRole.RENTER]: [
      {
        id: 'cancel',
        label: 'Скасувати',
        type: ButtonTypes.default,
        action: (bookingId: string) => {
          updateBookingStatus(bookingId, BookingStatus.CANCELLED);
        },
        isVisible: true,
      },
      {
        id: 'confirm-return',
        label: 'Підтвердити повернення',
        type: ButtonTypes.primary,
        action: (bookingId: string) => {
          updateBookingStatus(bookingId, BookingStatus.IN_PROGRESS);
        },
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'cancel',
        label: 'Скасувати',
        type: ButtonTypes.default,
        action: (bookingId: string) => {
          updateBookingStatus(bookingId, BookingStatus.CANCELLED);
        },
        isVisible: true,
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
        action: (bookingId: string) => {
          updateBookingStatus(bookingId, BookingStatus.RETURNED);
        },
        isVisible: true,
      },
    ],
  },
  [BookingStatus.RETURNED]: {
    [UserRole.RENTER]: [
      {
        id: 'rate',
        label: 'Залишити відгук',
        type: ButtonTypes.primary,
        action: (
          bookingId: string,
          _navigate?: (path: string) => void,
          rating?: number,
          feedback?: string
        ) => {
          updateBookingStatus(bookingId, BookingStatus.RATED);
          submitFeedback(bookingId, rating!, feedback!);
        },
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'rate',
        label: 'Залишити відгук',
        type: ButtonTypes.primary,
        action: (
          bookingId: string,
          _navigate?: (path: string) => void,
          rating?: number,
          feedback?: string
        ) => {
          updateBookingStatus(bookingId, BookingStatus.RATED);
          submitFeedback(bookingId, rating!, feedback!);
        },
        isVisible: true,
      },
    ],
  },
  [BookingStatus.RATED]: {
    [UserRole.RENTER]: [
      {
        id: 'return-to-publications',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: (_bookingId: string, navigate?: (path: string) => void) => {
          navigate?.(ROUTES.SEARCH_RESULTS);
        },
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'return-to-publications',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: (_bookingId: string, navigate?: (path: string) => void) => {
          navigate?.(ROUTES.SEARCH_RESULTS);
        },
        isVisible: true,
      },
    ],
  },
  [BookingStatus.CANCELLED]: {
    [UserRole.RENTER]: [
      {
        id: 'return-to-publications',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: (_bookingId: string, navigate?: (path: string) => void) => {
          navigate?.(ROUTES.SEARCH_RESULTS);
        },
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'return-to-publications',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: (_bookingId: string, navigate?: (path: string) => void) => {
          navigate?.(ROUTES.SEARCH_RESULTS);
        },
        isVisible: true,
      },
    ],
  },
  [BookingStatus.COMPLETED]: {
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
