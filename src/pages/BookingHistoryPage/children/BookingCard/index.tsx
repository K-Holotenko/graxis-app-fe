import dayjs from 'dayjs';
import { Avatar, Tag } from 'antd';
import { Link } from 'react-router-dom';

import { Booking, UserRole } from 'src/types';
import { getDaysDifference } from 'src/utils/formatDate';
import {
  IMAGE_DESCRIPTION,
  Status,
  statusToColorMap,
  statusToLabelMap,
} from 'src/config/constants';

import styles from './styles.module.scss';

interface BookingCardProps {
  booking: Booking;
  role: UserRole | null;
}

export const BookingCard = ({ booking, role }: BookingCardProps) => (
  <Link to={`/booking/${booking.id}`} className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={`${styles.value} ${styles.periodMobile}`}>
        {dayjs(booking.startDate).format('DD.MM.YY')}
        {' - '}
        {dayjs(booking.endDate).format('DD.MM.YY')}
      </div>
      <Tag
        color={statusToColorMap[booking.bookingStatus as Status]}
        className={styles.statusTagMobile}
      >
        {statusToLabelMap[booking.bookingStatus as Status]}
      </Tag>
    </div>
    <div className={styles.cardBody}>
      <div className={styles.infoContainer}>
        <img
          className={styles.image}
          src={booking.publication.thumbnailUrl}
          alt={booking.publication.title}
        />
        <div className={styles.infoContent}>
          <div className={styles.title}>{booking.publication.title}</div>
          <div className={styles.contact}>
            <Avatar
              size={24}
              style={{ minWidth: '24px' }}
              src={
                role === UserRole.RENTER
                  ? booking.owner.avatarUrl?.length
                    ? booking.owner.avatarUrl
                    : undefined
                  : booking.renter.avatarUrl?.length
                    ? booking.renter.avatarUrl
                    : undefined
              }
              alt={IMAGE_DESCRIPTION.USER_ICON}
            >
              {role === UserRole.RENTER
                ? booking.owner.name?.charAt(0)
                : booking.renter.name?.charAt(0)}
              {role === UserRole.OWNER
                ? booking.renter.surname?.charAt(0)
                : booking.owner.surname?.charAt(0)}
            </Avatar>
            {role === UserRole.RENTER
              ? `${booking.owner.name} ${booking.owner.surname}`
              : `${booking.renter.name} ${booking.renter.surname}`}
          </div>
          <div className={styles.status}>
            <Tag
              color={statusToColorMap[booking.bookingStatus as Status]}
              className={styles.statusTag}
            >
              {statusToLabelMap[booking.bookingStatus as Status]}
            </Tag>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.duration}>
              {getDaysDifference(booking.startDate, booking.endDate)} днів
            </div>
            <div className={`${styles.value} ${styles.price}`}>
              {booking.price} грн.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.itemsContainer}>
        <div className={styles.itemContainer}>
          <div className={styles.label}>Період</div>
          <div className={styles.value}>
            {dayjs(booking.startDate).format('DD.MM.YY')}
            {' - '}
            {dayjs(booking.endDate).format('DD.MM.YY')}
          </div>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.label}>Тривалість</div>
          <div className={styles.value}>
            {getDaysDifference(booking.startDate, booking.endDate)} днів
          </div>
        </div>
        <div className={styles.itemContainer}>
          <div className={styles.label}>Сума</div>
          <div className={styles.value}>{booking.price} грн.</div>
        </div>
      </div>
    </div>
  </Link>
);
