import { create } from 'zustand';

import { Booking, createBooking, getBooking } from 'src/services/Booking';

interface BookingStore {
  booking: Booking | null;
  isLoading: boolean;
  createBooking: (
    startDate: string | undefined,
    endDate: string | undefined,
    publicationId: string
  ) => Promise<Booking | null>;
  getBooking: (id: string) => Promise<Booking | null>;
}

export const useBookingStore = create<BookingStore>((set) => ({
  booking: null,
  isLoading: false,
  createBooking: async (
    startDate: string | undefined,
    endDate: string | undefined,
    publicationId: string
  ) => {
    set({ isLoading: true });

    try {
      const response = await createBooking(startDate, endDate, publicationId);

      set({ booking: response });

      return response;
    } catch {
      // showError('Категорії наразі недоступні. Спробуйте ще раз');
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  getBooking: async (id: string) => {
    set({ isLoading: true });

    try {
      const response = await getBooking(id);

      set({ booking: response });

      return response;
    } catch {
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
