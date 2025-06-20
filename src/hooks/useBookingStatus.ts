import { useEffect, useState } from 'react';

import { socket } from 'src/sockets';
import { useBookingStore } from 'src/stores/bookingStore';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking';

export const useBookingStatus = (): { bookingStatus: BookingStatus | null } => {
  const { booking } = useBookingStore();
  const [bookingStatus, setBookingStatus] = useState<BookingStatus | null>(
    booking?.bookingStatus || null
  );

  useEffect(() => {
    socket.on('booking.status-update', (status: BookingStatus) => {
      setBookingStatus(status);
    });

    return () => {
      socket.off('booking.status-update');
    };
  }, []);

  return {
    bookingStatus,
  };
};
