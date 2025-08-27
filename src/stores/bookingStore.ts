import { create } from 'zustand';

import { socket } from 'src/sockets';
import {
  createBooking,
  getAllMyBookings,
  getBooking,
  changeBookingStatus,
} from 'src/services/Booking';
import { getChat } from 'src/services/Chat';
import { Booking, BookingStatus, Chat } from 'src/types';

interface BookingStore {
  booking: Booking | null;
  bookings: Booking[] | null;
  isBookingLoading: boolean;
  chat: Chat | null;
  isChatLoading: boolean;
  rating: number | undefined;
  feedback: string | undefined;
  setFeedback: (feedback: string) => void;
  setRating: (rating: number) => void;
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
  connectToBookingStatusUpdate: (bookingId: string) => () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  booking: null,
  bookings: null,
  isBookingLoading: false,
  chat: null,
  isChatLoading: false,
  rating: undefined,
  feedback: undefined,
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
            lastStatusBeforeCancellation: currentBooking.bookingStatus,
            bookingStatus: status,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  },

  connectToBookingStatusUpdate: (bookingId: string) => {
    const handler = (data: {
      bookingStatus: BookingStatus;
      bookingId: string;
    }): void => {
      const currentBooking = get().booking;

      if (currentBooking && data.bookingId === bookingId) {
        set({
          booking: {
            ...currentBooking,
            bookingStatus: data.bookingStatus,
          },
        });
      }
    };

    socket.on(SocketEvent.BOOKING_STATUS_UPDATE, handler);

    return () => socket.off(SocketEvent.BOOKING_STATUS_UPDATE, handler);
  },

  setRating: async (rating: number) => {
    set({ rating });
  },

  setFeedback: async (feedback: string) => {
    set({ feedback });
  },
}));
