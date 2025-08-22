import { useMemo, useEffect, useState } from 'react';
import { ConfigProvider, Steps } from 'antd';

import { theme } from 'src/config/theme';
import { Container } from 'src/pages/BookingPage/children/Container';
import { useBookingStore } from 'src/stores/bookingStore';
import { Loadable } from 'src/components/Loadable';
import { StepsSkeleton } from 'src/pages/BookingPage/skeletons';
import {
  getUserRole,
  UserRole,
} from 'src/pages/BookingPage/children/BookingDialog/utils';
import { useAuthStore } from 'src/stores/authStore';

import styles from './styles.module.scss';
import { BookingDetails } from './BookingDetails';
import { Feedback } from './Feedback';
import { BookingStatus, renderItems } from './utils';

export const Booking = () => {
  const { booking, isBookingLoading } = useBookingStore();

  const { user } = useAuthStore();
  const userRole: UserRole = getUserRole(booking, user?.id);

  const [showGreetingAfterSubmit, setShowGreetingAfterSubmit] = useState(false);

  const isFeedbackStep = useMemo(
    () =>
      booking?.bookingStatus === BookingStatus.RETURNED ||
      booking?.bookingStatus === BookingStatus.OWNER_RATED ||
      booking?.bookingStatus === BookingStatus.RENTER_RATED,
    [booking?.bookingStatus]
  );

  // eslint-disable-next-line no-console
  console.log(booking?.bookingStatus);

  useEffect(() => {
    const isRatedStatus =
      booking?.bookingStatus === BookingStatus.RATED ||
      booking?.bookingStatus === BookingStatus.OWNER_RATED ||
      booking?.bookingStatus === BookingStatus.RENTER_RATED;

    if (!isRatedStatus) {
      return;
    }

    const greetingKey = `greeting_shown_${booking.id}`;
    const greetingShown = localStorage.getItem(greetingKey);

    if (!greetingShown) {
      // Show greeting for 3 seconds after feedback submission
      setShowGreetingAfterSubmit(true);
      localStorage.setItem(greetingKey, 'true');

      const timer = setTimeout(() => {
        setShowGreetingAfterSubmit(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [booking?.bookingStatus, booking?.id]);

  return (
    <Container>
      <ConfigProvider theme={stepsTheme}>
        <div className={styles.booking}>
          <Loadable
            isLoading={isBookingLoading}
            skeleton={<StepsSkeleton />}
            component={() => (
              <Steps
                className={styles.steps}
                size="small"
                responsive={false}
                labelPlacement="vertical"
                items={renderItems(
                  booking?.bookingStatus || null,
                  booking?.lastStatusBeforeCancellation ||
                    booking?.bookingStatus,
                  userRole
                )}
              />
            )}
          />
        </div>
      </ConfigProvider>
      {showGreetingAfterSubmit ? (
        <div className={styles.feedbackContainer}>
          <p className={styles.feedbackTitle}>Дякуємо за відгук!</p>
          <p className={styles.feedbackSuccess}>Відгук успішно надіслано</p>
        </div>
      ) : isFeedbackStep ? (
        <Feedback />
      ) : (
        <BookingDetails />
      )}
    </Container>
  );
};

const stepsTheme = {
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
};
