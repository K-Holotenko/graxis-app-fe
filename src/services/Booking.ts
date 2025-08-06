import axios from 'axios';

import { BookingStatus } from 'src/pages/BookingPage/children/Booking/utils';
import { GRAXIS_API_URL } from 'src/config/constants';

import { api } from './api';

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
  paymentStatus: 'UNPAID';
  renterId: string;
  publicationAddressShow: boolean;
  publicationAddress: {
    country: string;
    city: string;
    address: string;
    lat: number;
    lng: number;
  };
  lastStatusBeforeCancellation: BookingStatus | null;
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

export const paymentTransaction = async (id: string): Promise<unknown> => {
  const response = await axios.post(
    `${GRAXIS_API_URL}/payment-transaction/mark-paid`,
    {
      bookingId: id,
      transactionId: id,
    }
  );

  return response.data;
};

export const submitFeedback = async (
  bookingId: string,
  publicationTitle: string,
  stars: number,
  text: string
): Promise<Booking> => {
  const response = await api.post('/feedback', {
    bookingId,
    publicationTitle,
    stars,
    text,
  });

  return response.data;
};
