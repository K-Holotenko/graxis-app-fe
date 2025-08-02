import { useMemo } from 'react';
import { ConfigProvider, Steps } from 'antd';

import { theme } from 'src/config/theme';
import { Container } from 'src/pages/BookingPage/children/Container';
import { useBookingStore } from 'src/stores/bookingStore';
import { useBookingStatus } from 'src/hooks/useBookingStatus';
import { Loadable } from 'src/components/Loadable';
import { StepsSkeleton } from 'src/pages/BookingPage/skeletons';

import styles from './styles.module.scss';
import { BookingDetails } from './BookingDetails';
import { Feedback } from './Feedback';
import { BookingStatus, renderItems } from './utils';

export const Booking = () => {
  const { booking, isBookingLoading } = useBookingStore();
  const { bookingStatus } = useBookingStatus();

  const isFeedbackStep = useMemo(
    () =>
      bookingStatus === BookingStatus.RETURNED ||
      bookingStatus === BookingStatus.RATED,
    [bookingStatus]
  );

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
                  bookingStatus,
                  booking?.lastStatusBeforeCancellation ||
                    booking?.bookingStatus
                )}
              />
            )}
          />
        </div>
      </ConfigProvider>
      {isFeedbackStep ? <Feedback /> : <BookingDetails />}
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
