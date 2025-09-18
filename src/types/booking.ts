import { Location } from './common';

export enum UserRole {
  RENTER = 'RENTER',
  OWNER = 'OWNER',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  RETURNED = 'RETURNED',
  RATED = 'RATED',
  OWNER_RATED = 'OWNER_RATED',
  RENTER_RATED = 'RENTER_RATED',
  PAID = 'PAID',
  BOOKED = 'BOOKED',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  FAIL = 'FAIL',
  REFUNDED = 'REFUNDED',
  REFUNDED_IN_PROGRESS = 'REFUNDED_IN_PROGRESS',
}

export interface Booking {
  id: string;
  bookingStatus: BookingStatus;
  chatId: string;
  chatShow: boolean;
  startDate: string;
  endDate: string;
  publication: {
    id: string;
    title: string;
    thumbnailUrl: string;
  };
  paymentStatus: PaymentStatus;
  renterId: string;
  publicationAddressShow: boolean;
  publicationAddress: Location;
  lastStatusBeforeCancellation: BookingStatus | null;
  owner: {
    id: string;
    name: string;
    surname: string;
    avatarUrl: string;
  };
  renter: {
    id: string;
    name: string;
    surname: string;
    avatarUrl: string;
  };
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  sentAt: string;
}

export interface Chat {
  id: string;
  bookingId: string;
  messages: ChatMessage[];
  updatedAt: string;
  participants: {
    id: string;
    avatarUrl: string;
    name: string;
    surname: string;
    hasNewMessages: boolean;
  }[];
}
