import dayjs from 'dayjs';
import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Shelf } from 'src/pages/BookingPage/children/Shelf';
import { useBookingStore } from 'src/stores/bookingStore';
import { CardSkeleton, DetailsSkeleton } from 'src/pages/BookingPage/skeletons';
import { Loadable } from 'src/components/Loadable';
import { BookingStatus } from 'src/types';

import styles from './styles.module.scss';

export const BookingDetails = () => {
  const { booking, isBookingLoading, getBooking } = useBookingStore();

  const { id } = useParams();
  const hasUpdatedForPaidStatus = useRef(false);

  const startDate = dayjs(booking?.startDate);
  const endDate = dayjs(booking?.endDate);
  const days = endDate.diff(startDate, 'day') + 1;

  useEffect(() => {
    const shouldUpdateBooking =
      id &&
      booking &&
      booking.bookingStatus === BookingStatus.PAID &&
      !hasUpdatedForPaidStatus.current;

    if (shouldUpdateBooking) {
      hasUpdatedForPaidStatus.current = true;
      getBooking(id);
    }

    if (booking?.bookingStatus !== BookingStatus.PAID) {
      hasUpdatedForPaidStatus.current = false;
    }
  }, [booking?.bookingStatus, id, getBooking]);

  const taxonomy = useMemo(
    () => [
      {
        label: 'Період',
        value: `З ${startDate.format('DD.MM.YY')} по ${endDate.format('DD.MM.YY')}`,
        style: styles.taxonomy,
      },
      {
        label: 'Тривалість',
        value: `${days} днів`,
        style: styles.taxonomy,
      },
      {
        label: 'Ціна',
        value: `₴${booking?.price}`,
        style: styles.priceCard,
      },
    ],
    [startDate, endDate, days, booking?.price]
  );

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
      <div className={styles.taxonomyContainer}>
        {taxonomy.map(({ label, value, style }) => (
          <Loadable
            key={label}
            isLoading={isBookingLoading}
            skeleton={<CardSkeleton />}
            component={() => (
              <div className={styles.cardContainer}>
                <div className={`${styles.card} ${style}`}>{value}</div>
                <span className={styles.cardLabel}>{label}</span>
              </div>
            )}
          />
        ))}
      </div>
    </>
  );
};
