import { useEffect, useState } from 'react';

import { socket } from 'src/sockets';
import { useBookingStore } from 'src/stores/bookingStore';
import { BookingStatus } from 'src/types';

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
      'booking.status-update',
      (data: { bookingStatus: BookingStatus; bookingId: string }) => {
        // Only update if this is for the current booking
        if (booking?.id && data.bookingId === booking.id) {
          setBookingStatus(data.bookingStatus);
        }
      }
    );

    return () => {
      socket.off('booking.status-update');
    };
  }, [booking?.id]);

  return {
    bookingStatus,
    setBookingStatus,
  };
};
