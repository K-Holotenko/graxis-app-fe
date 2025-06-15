import { GRAXIS_API_URL } from 'src/config/constants';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking';
import CookieService from 'src/services/CookieService';

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
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(`${GRAXIS_API_URL}/booking/create`, {
    method: 'POST',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate,
      endDate,
      publicationId,
    }),
  });

  const responseBody = await response.json();

  return responseBody;
};

export const getBooking = async (id: string): Promise<Booking> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(`${GRAXIS_API_URL}/booking/${id}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });

  const responseBody = await response.json();

  return responseBody;
};

export const changeBookingStatus = async (
  id: string,
  bookingStatus: BookingStatus
): Promise<Booking> => {
  const token = `Bearer ${CookieService.getCookie('accessToken')}`;

  const response = await fetch(
    `${GRAXIS_API_URL}/booking/change-status/${id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingStatus,
      }),
    }
  );

  const responseBody = await response.json();

  return responseBody;
};
