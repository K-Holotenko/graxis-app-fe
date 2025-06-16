import { BookingStatus } from 'src/pages/BookingPage/children/Booking';

import { api } from './api';

export interface Booking {
  id: string;
  bookingStatus: 'PENDING';
  chatId: string;
  chatShow: boolean;
  startDate: string;
  endDate: string;
  publication: {
    id: string;
    title: string;
    thumbnailUrl: string;
  };
  paymentStatus: 'UNPAID';
  renterId: string;
  publicationAddressShow: false;
  owner: {
    id: string;
    name: string;
    surname: string;
    avatarUrl: string;
  };
  price: number;
  createdAt: string;
  updatedAt: string;
}

export const createBooking = async (
  startDate: string | undefined,
  endDate: string | undefined,
  publicationId: string
): Promise<Booking> => {
  const response = await api.post(`/booking/create`, {
    startDate,
    endDate,
    publicationId,
  });

  return response.data;
};

export const getBooking = async (id: string): Promise<Booking> => {
  const response = await api.get(`/booking/${id}`);

  return response.data;
};

export const getAllMyBookings = async (): Promise<Booking[]> => {
  const response = await api.get(`/booking/all`);

  return response.data;
};

export const changeBookingStatus = async (
  id: string,
  bookingStatus: BookingStatus
): Promise<Booking> => {
  const response = await api.put(`/booking/change-status/${id}`, {
    bookingStatus,
  });

  return response.data;
};
