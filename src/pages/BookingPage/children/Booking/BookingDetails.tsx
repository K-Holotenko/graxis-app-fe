import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Shelf } from 'src/pages/BookingPage/children/Shelf';
import { useBookingStore } from 'src/stores/bookingStore';
import { useBookingStatus } from 'src/hooks/useBookingStatus';
import { CardSkeleton, DetailsSkeleton } from 'src/pages/BookingPage/skeletons';
import { Loadable } from 'src/components/Loadable';

import styles from './styles.module.scss';
import { BookingStatus } from './utils';

export const BookingDetails = () => {
  const { booking, isBookingLoading, getBooking } = useBookingStore();
  const { bookingStatus } = useBookingStatus();

  const { id } = useParams();
  const hasUpdatedForPaidStatus = useRef(false);

  const startDate = dayjs(booking?.startDate);
  const endDate = dayjs(booking?.endDate);
  const days = endDate.diff(startDate, 'day') + 1;

  useEffect(() => {
    const shouldUpdateBooking =
      id &&
      booking &&
      bookingStatus === BookingStatus.PAID &&
      !hasUpdatedForPaidStatus.current;

    if (shouldUpdateBooking) {
      hasUpdatedForPaidStatus.current = true;
      getBooking(id);
    }

    if (bookingStatus !== BookingStatus.PAID) {
      hasUpdatedForPaidStatus.current = false;
    }
  }, [bookingStatus, id, getBooking]);

  return (
    <>
      <p className={styles.titles}>Деталі</p>
      <Loadable
        isLoading={isBookingLoading}
        skeleton={<DetailsSkeleton />}
        component={() => (
          <Shelf to={`/publication/${booking?.publication.id}`}>
            <div className={styles.publication}>
              <div className={styles.publicationImageContainer}>
                <img
                  className={styles.publicationImage}
                  src={booking?.publication.thumbnailUrl}
                  alt={booking?.publication.title}
                />
              </div>
              <span className={styles.shelfItem}>
                {booking?.publication.title}
              </span>
            </div>
          </Shelf>
        )}
      />
      <Loadable
        isLoading={isBookingLoading}
        skeleton={<DetailsSkeleton />}
        component={() => (
          <Shelf to={`/profile/${booking?.owner.id}`}>
            <span className={styles.shelfItem}>
              {booking?.owner.name} {booking?.owner.surname}
            </span>
          </Shelf>
        )}
      />
      <Loadable
        isLoading={isBookingLoading}
        skeleton={<DetailsSkeleton />}
        component={() => (
          <Shelf
            to={`https://www.google.com/maps?q=${booking?.publicationAddress?.lat},${booking?.publicationAddress?.lng}`}
            target="_blank"
          >
            <span className={styles.shelfItem}>
              {`${booking?.publicationAddress?.country}, ${booking?.publicationAddress?.city}, ${booking?.publicationAddress?.locality}`}
            </span>
          </Shelf>
        )}
      />
      <div className={styles.cardsContainer}>
        <Loadable
          isLoading={isBookingLoading}
          skeleton={<CardSkeleton />}
          component={() => (
            <div className={styles.cardContainer}>
              <div className={`${styles.card} ${styles.priceCard}`}>
                ₴{booking?.price}
              </div>
              <span className={styles.cardLabel}>Ціна</span>
            </div>
          )}
        />
        <Loadable
          isLoading={isBookingLoading}
          skeleton={<CardSkeleton />}
          component={() => (
            <div className={styles.cardContainer}>
              <div className={`${styles.card} ${styles.rentPeriodCard}`}>
                {days} днів
              </div>
              <span className={styles.cardLabel}>Період оренди</span>
            </div>
          )}
        />
      </div>
    </>
  );
};
