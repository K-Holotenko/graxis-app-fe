import { create } from 'zustand';

import {
  Booking,
  createBooking,
  getAllMyBookings,
  getBooking,
  changeBookingStatus,
} from 'src/services/Booking';
import { getChat } from 'src/services/Chat';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking';

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

interface BookingStore {
  booking: Booking | null;
  bookings: Booking[] | null;
  isBookingLoading: boolean;
  chat: Chat | null;
  isChatLoading: boolean;
  createBooking: (
    startDate: string | undefined,
    endDate: string | undefined,
    publicationId: string
  ) => Promise<Booking | null>;
  getBooking: (id: string) => Promise<Booking | null>;
  getAllMyBookings: () => Promise<Booking[] | null>;
  getChat: (id: string) => Promise<Chat | null>;
  updateBookingStatus: (
    bookingId: string,
    status: BookingStatus
  ) => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  booking: null,
  bookings: null,
  isBookingLoading: false,
  chat: null,
  isChatLoading: false,

  createBooking: async (
    startDate: string | undefined,
    endDate: string | undefined,
    publicationId: string
  ) => {
    set({ isBookingLoading: true });

    try {
      const response = await createBooking(startDate, endDate, publicationId);

      set({ booking: response });

      return response;
    } catch {
      return null;
    } finally {
      set({ isBookingLoading: false });
    }
  },

  getBooking: async (id: string) => {
    set({ isBookingLoading: true });

    try {
      const response = await getBooking(id);

      set({ booking: response });

      return response;
    } catch {
      return null;
    } finally {
      set({ isBookingLoading: false });
    }
  },

  getAllMyBookings: async () => {
    set({ isBookingLoading: true });

    try {
      const response = await getAllMyBookings();

      set({ bookings: response });

      return response;
    } catch {
      return null;
    } finally {
      set({ isBookingLoading: false });
    }
  },

  getChat: async (id: string) => {
    set({ isChatLoading: true });

    try {
      const response = await getChat(id);

      set({ chat: response as Chat });

      return response as Chat;
    } catch {
      return null;
    } finally {
      set({ isChatLoading: false });
    }
  },

  updateBookingStatus: async (bookingId: string, status: BookingStatus) => {
    try {
      await changeBookingStatus(bookingId, status);

      // Update local state immediately for better UX
      const currentBooking = get().booking;

      if (currentBooking && currentBooking.id === bookingId) {
        set({
          booking: {
            ...currentBooking,
            bookingStatus: status,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  },
}));
