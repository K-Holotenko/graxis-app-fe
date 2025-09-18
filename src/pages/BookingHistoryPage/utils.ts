import { Booking, BookingStatus } from 'src/types';

export interface BookingFilterParams {
  role?: string | null;
  status?: string | null;
  sorting?: string | null;
}

export interface MyBookings {
  owner: Booking[];
  renter: Booking[];
}

/**
 * Filters and sorts bookings based on query parameters
 * @param myBookings - Object containing owner and renter bookings
 * @param params - Filter and sort parameters from URL search params
 * @returns Filtered and sorted array of bookings
 */
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

  if (!role || role === 'all') {
    // Include both owner and renter bookings
    bookingsToProcess = [...myBookings.owner, ...myBookings.renter];
  } else if (role === 'owner') {
    bookingsToProcess = [...myBookings.owner];
  } else if (role === 'renter') {
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
