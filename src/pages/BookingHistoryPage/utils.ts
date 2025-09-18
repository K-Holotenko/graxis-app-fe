import { Booking, BookingStatus, UserRole } from 'src/types';

export interface BookingFilterParams {
  role?: string | null;
  status?: string | null;
  sorting?: string | null;
}

export interface MyBookings {
  owner: Booking[];
  renter: Booking[];
}

export const filterAndSortBookings = (
  myBookings: MyBookings | null,
  params: BookingFilterParams
): Booking[] => {
  if (!myBookings) {
    return [];
  }

  const { role, status, sorting } = params;

  // Determine which bookings to include based on role filter
  let bookingsToProcess: Booking[] = [];

  if (!role) {
    bookingsToProcess = [...myBookings.owner, ...myBookings.renter];
  } else if (role === UserRole.OWNER) {
    bookingsToProcess = [...myBookings.owner];
  } else if (role === UserRole.RENTER) {
    bookingsToProcess = [...myBookings.renter];
  }

  // Filter by status if specified
  let filteredBookings = bookingsToProcess;

  if (
    status &&
    Object.values(BookingStatus).includes(status as BookingStatus)
  ) {
    filteredBookings = bookingsToProcess.filter(
      (booking) => booking.bookingStatus === status
    );
  }

  // Sort bookings based on sorting parameter
  const sortedBookings = [...filteredBookings];

  if (sorting) {
    switch (sorting) {
      case 'date-asc':
        sortedBookings.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        break;
      case 'date-desc':
        sortedBookings.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        break;
      case 'price-asc':
        sortedBookings.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedBookings.sort((a, b) => b.price - a.price);
        break;
      default:
        // No sorting or unknown sorting option
        break;
    }
  }

  return sortedBookings;
};
