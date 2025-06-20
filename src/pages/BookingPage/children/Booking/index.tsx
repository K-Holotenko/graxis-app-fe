import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ConfigProvider, StepProps, Steps } from 'antd';
import dayjs from 'dayjs';

import CheckIcon from 'src/assets/icons/check.svg?react';
import CrossIcon from 'src/assets/icons/cross-icon.svg?react';
import { theme } from 'src/config/theme';
import { Container } from 'src/pages/BookingPage/children/Container';
import { Shelf } from 'src/pages/BookingPage/children/Shelf';
import { useBookingStore } from 'src/stores/bookingStore';

import styles from './styles.module.scss';

const statusToIconMap = {
  finish: <CheckIcon />,
  process: <CheckIcon />,
  wait: <CheckIcon />,
  error: <CrossIcon />,
};

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  RETURNED = 'RETURNED',
  RATED = 'RATED',
  //This status is not available in the backend, but it is used in the frontend
  PAID = 'PAID',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  FAIL = 'FAIL',
  REFUNDED = 'REFUNDED',
  REFUNDED_IN_PROGRESS = 'REFUNDED_IN_PROGRESS',
}

const getStepStatus = (
  currentStatus: BookingStatus,
  stepIndex: number
): StepProps['status'] => {
  const statusOrder: Record<
    Exclude<BookingStatus, BookingStatus.CANCELLED>,
    number
  > = {
    [BookingStatus.PENDING]: 0,
    [BookingStatus.CONFIRMED]: 1,
    [BookingStatus.PAID]: 2,
    [BookingStatus.IN_PROGRESS]: 3,
    [BookingStatus.COMPLETED]: 4,
    [BookingStatus.RETURNED]: 5,
    [BookingStatus.RATED]: 6,
  };

  const currentStep =
    currentStatus === BookingStatus.CANCELLED
      ? -1
      : (statusOrder[
          currentStatus as Exclude<BookingStatus, BookingStatus.CANCELLED>
        ] ?? -1);

  if (currentStatus === BookingStatus.CANCELLED) {
    return stepIndex === 0 ? 'finish' : stepIndex === 2 ? 'error' : 'wait';
  }

  if (stepIndex <= currentStep) {
    return 'finish';
  }

  return 'wait';
};

const renderItems = (status: BookingStatus | undefined): StepProps[] => {
  const steps: StepProps[] = [
    { title: 'Надіслано' },
    { title: 'Прийнято' },
    { title: 'Сплачено' },
    { title: <span style={{ marginLeft: '-18px' }}>Заброньовано</span> },
    { title: 'В оренді' },
    { title: 'Повернено' },
    { title: 'Відгук' },
  ];

  if (!status) return steps;

  return steps.map((step, index) => {
    const stepStatus = getStepStatus(status, index);
    const isCancelled = status === BookingStatus.CANCELLED && index === 2;

    return {
      ...step,
      icon:
        stepStatus === 'finish'
          ? statusToIconMap.finish
          : stepStatus === 'error'
            ? statusToIconMap.error
            : undefined,
      status: stepStatus,
      title: isCancelled ? 'Скасовано' : step.title,
    };
  });
};

export const Booking = () => {
  const { booking, getBooking } = useBookingStore();
  const params = useParams();

  useEffect(() => {
    const bookingId = params.id;

    if (bookingId) {
      getBooking(bookingId);
    }
  }, []);

  const startDate = dayjs(booking?.startDate);
  const endDate = dayjs(booking?.endDate);
  const days = endDate.diff(startDate, 'day') + 1;

  return (
    <Container>
      <div className={styles.booking}>
        <ConfigProvider
          theme={{
            token: {
              lineWidth: 2,
              colorSplit: theme.N3,
              colorPrimary: theme.primary,
              marginXS: 20,
              lineHeight: 1.5,
            },
            components: {
              Steps: {
                titleLineHeight: 1.5,
                fontSize: 16,
                iconSizeSM: 20,
              },
            },
          }}
        >
          <Steps
            className={styles.steps}
            size="small"
            responsive={false}
            labelPlacement="vertical"
            items={renderItems(booking?.bookingStatus as BookingStatus)}
          />
        </ConfigProvider>
      </div>
      <p className={styles.detailsTitles}>Деталі</p>
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
      <Shelf to="">
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
    </Container>
  );
};
