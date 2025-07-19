import dayjs from 'dayjs';

import { Shelf } from 'src/pages/BookingPage/children/Shelf';
import { useBookingStore } from 'src/stores/bookingStore';

import styles from './styles.module.scss';

const BookingDetails = () => {
  const { booking } = useBookingStore();

  const startDate = dayjs(booking?.startDate);
  const endDate = dayjs(booking?.endDate);
  const days = endDate.diff(startDate, 'day') + 1;

  return (
    <>
      <p className={styles.titles}>Деталі</p>
      <Shelf to={`/publication/${booking?.publication.id}`}>
        <div className={styles.publication}>
          <div className={styles.publicationImageContainer}>
            <img
              className={styles.publicationImage}
              src={booking?.publication.thumbnailUrl}
              alt={booking?.publication.title}
            />
          </div>
          <span className={styles.shelfItem}>{booking?.publication.title}</span>
        </div>
      </Shelf>
      <Shelf to={`/profile/${booking?.owner.id}`}>
        <span className={styles.shelfItem}>
          {booking?.owner.name} {booking?.owner.surname}
        </span>
      </Shelf>
      <Shelf to="TODO update in a separate ticket">
        <span className={styles.shelfItem}>
          Детальна адреса буде доступна після підтвердження оплати
        </span>
      </Shelf>
      <div className={styles.cardsContainer}>
        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${styles.priceCard}`}>
            ₴{booking?.price}
          </div>
          <span className={styles.cardLabel}>Ціна</span>
        </div>
        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${styles.rentPeriodCard}`}>
            {days} днів
          </div>
          <span className={styles.cardLabel}>Період оренди</span>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
