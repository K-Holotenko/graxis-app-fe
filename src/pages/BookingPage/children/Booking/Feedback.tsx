import { useMemo } from 'react';
import { ConfigProvider, Rate } from 'antd';

import { TextArea } from 'src/components/TextArea';
import { theme } from 'src/config/theme';
import { useBookingStore } from 'src/stores/bookingStore';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking/utils';
import { useAuthStore } from 'src/stores/authStore';
import {
  getUserRole,
  UserRole,
} from 'src/pages/BookingPage/children/BookingDialog/utils';

import styles from './styles.module.scss';

export const Feedback = () => {
  const { booking, setFeedback, setRating } = useBookingStore();

  const { user } = useAuthStore();
  const userRole: UserRole = getUserRole(booking, user?.id);

  const shouldShowGreeting = useMemo(
    () =>
      (userRole === UserRole.RENTER &&
        booking?.bookingStatus === BookingStatus.RENTER_RATED) ||
      (userRole === UserRole.OWNER &&
        booking?.bookingStatus === BookingStatus.OWNER_RATED) ||
      booking?.bookingStatus === BookingStatus.RATED,
    [booking?.bookingStatus, userRole]
  );

  if (shouldShowGreeting) {
    return (
      <div className={styles.feedbackContainer}>
        <p className={styles.feedbackTitle}>Дякуємо за відгук!</p>
        <p className={styles.feedbackSuccess}>Відгук успішно надіслано</p>
      </div>
    );
  }

  // TODO: add view for COMPLETED status

  return (
    <>
      <p className={styles.titles}>Залиште відгук</p>
      <ConfigProvider theme={localTheme}>
        <Rate
          className={styles.feedbackRate}
          data-testid="feedback-rate"
          onChange={(number) => setRating(number)}
        />
        <TextArea
          placeholder="Залиште відгук"
          onChange={(e) => setFeedback(e.target.value)}
          rows={5}
          maxLength={250}
          autoSize={{ minRows: 5, maxRows: 5 }}
          showCount
          className={styles.feedbackTextArea}
        />
      </ConfigProvider>
    </>
  );
};

const localTheme = {
  components: {
    Rate: {
      lineWidth: 1,
      starColor: theme.secondary,
      starSize: 20,
    },
  },
};
