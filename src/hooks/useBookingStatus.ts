import { useEffect, useState } from 'react';

import { socket } from 'src/sockets';
import { useBookingStore } from 'src/stores/bookingStore';
import { BookingStatus } from 'src/types';
import { SocketEvent } from 'src/config/constants';

export const useBookingStatus = (): {
  bookingStatus: BookingStatus | null;
  setBookingStatus: (status: BookingStatus) => void;
} => {
  const { booking } = useBookingStore();
  const [bookingStatus, setBookingStatus] = useState<BookingStatus | null>(
    booking?.bookingStatus || null
  );

  useEffect(() => {
    if (booking) {
      setBookingStatus(booking.bookingStatus);
    }
  }, [booking]);

  useEffect(() => {
    socket.on(
      SocketEvent.BOOKING_STATUS_UPDATE,
      (data: { bookingStatus: BookingStatus; bookingId: string }) => {
        // Only update if this is for the current booking
        if (booking?.id && data.bookingId === booking.id) {
          setBookingStatus(data.bookingStatus);
        }
      }
    );

    return () => {
      socket.off(SocketEvent.BOOKING_STATUS_UPDATE);
    };
  }, [booking?.id]);

  return {
    bookingStatus,
    setBookingStatus,
  };
};
