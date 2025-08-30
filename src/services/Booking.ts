import axios from 'axios';

import { Booking, BookingStatus } from 'src/types';

import { api } from './api';

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
    `${import.meta.env.VITE_APP_GRAXIS_API_URL}/payment-transaction/mark-paid`,
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
