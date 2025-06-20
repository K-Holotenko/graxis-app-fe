import { ButtonTypes } from 'src/config/constants';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking';
import { changeBookingStatus } from 'src/services/Booking';

export enum UserRole {
  RENTER = 'RENTER',
  OWNER = 'OWNER',
}

export interface BookingAction {
  id: string;
  label: string;
  type: ButtonTypes;
  action: (bookingId: string) => void;
  isVisible: boolean;
  isDisabled?: boolean;
}

export type BookingDialogConfig = {
  [K in BookingStatus]: {
    [R in UserRole]: BookingAction[];
  };
};

export const bookingDialogConfig: BookingDialogConfig = {
  [BookingStatus.PENDING]: {
    [UserRole.RENTER]: [
      {
        id: 'cancel',
        label: 'Скасувати запит',
        type: ButtonTypes.default,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.CANCELLED),
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'reject',
        label: 'Відхилити запит',
        type: ButtonTypes.default,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.CANCELLED),
        isVisible: true,
      },
      {
        id: 'confirm',
        label: 'Підтвердити запит',
        type: ButtonTypes.primary,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.CONFIRMED),
        isVisible: true,
      },
    ],
  },
  [BookingStatus.CONFIRMED]: {
    [UserRole.RENTER]: [
      {
        id: 'cancel',
        label: 'Скасувати бронювання',
        type: ButtonTypes.default,
        action: (bookingId: string) =>
          // TODO: change to PAID
          changeBookingStatus(bookingId, BookingStatus.CANCELLED),
        isVisible: true,
      },
      {
        id: 'cancel',
        label: 'Оплатити бронювання',
        type: ButtonTypes.default,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.CANCELLED),
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'cancel',
        label: 'Скасувати бронювання',
        type: ButtonTypes.default,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.CANCELLED),
        isVisible: true,
      },
    ],
  },
  [BookingStatus.PAID]: {
    [UserRole.RENTER]: [
      {
        id: 'start',
        label: 'Почати оренду',
        type: ButtonTypes.primary,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.IN_PROGRESS),
        isVisible: true,
      },
      {
        id: 'cancel',
        label: 'Скасувати бронювання',
        type: ButtonTypes.default,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.CANCELLED),
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'cancel',
        label: 'Скасувати бронювання',
        type: ButtonTypes.default,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.CANCELLED),
        isVisible: true,
      },
    ],
  },
  [BookingStatus.IN_PROGRESS]: {
    [UserRole.RENTER]: [],
    [UserRole.OWNER]: [
      {
        id: 'complete',
        label: 'Підтвердити повернення',
        type: ButtonTypes.primary,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.COMPLETED),
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
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.RATED),
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'rate',
        label: 'Залишити відгук',
        type: ButtonTypes.primary,
        action: (bookingId: string) =>
          changeBookingStatus(bookingId, BookingStatus.RATED),
        isVisible: true,
      },
    ],
  },
  [BookingStatus.RATED]: {
    [UserRole.RENTER]: [
      {
        id: 'return',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: (bookingId: string) =>
          // TODO: navigate renter to the publications page
          changeBookingStatus(bookingId, BookingStatus.RETURNED),
        isVisible: true,
      },
    ],
    [UserRole.OWNER]: [
      {
        id: 'confirm_return',
        label: 'Повернутися до публікацій',
        type: ButtonTypes.primary,
        action: (bookingId: string) =>
          // TODO: navigate owner to the publications page
          changeBookingStatus(bookingId, BookingStatus.RETURNED),
        isVisible: true,
      },
    ],
  },
  [BookingStatus.CANCELLED]: {
    [UserRole.RENTER]: [],
    [UserRole.OWNER]: [],
  },
  [BookingStatus.COMPLETED]: {
    [UserRole.RENTER]: [],
    [UserRole.OWNER]: [],
  },
};

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
  bookingStatus: BookingStatus | null,
  userRole: UserRole
): BookingAction[] => {
  if (!bookingStatus) return [];

  const statusConfig = bookingDialogConfig[bookingStatus];

  return statusConfig ? statusConfig[userRole] : [];
};
