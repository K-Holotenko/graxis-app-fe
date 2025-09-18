import { useMemo } from 'react';
import { ConfigProvider, Steps } from 'antd';

import { theme } from 'src/config/theme';
import { Container } from 'src/pages/BookingPage/children/Container';
import { useBookingStore } from 'src/stores/bookingStore';
import { Loadable } from 'src/components/Loadable';
import { StepsSkeleton } from 'src/pages/BookingPage/skeletons';
import { getUserRole } from 'src/pages/BookingPage/children/BookingDialog/utils';
import { useAuthStore } from 'src/stores/authStore';
import { BookingStatus, UserRole } from 'src/types';

import styles from './styles.module.scss';
import { BookingDetails } from './BookingDetails';
import { Feedback } from './Feedback';
import { renderItems } from './utils';

export const Booking = () => {
  const { booking, isBookingLoading } = useBookingStore();

  const { user } = useAuthStore();
  const userRole: UserRole = getUserRole(booking, user?.id);

  const isFeedbackStep = useMemo(
    () =>
      booking?.bookingStatus === BookingStatus.RETURNED ||
      (userRole === UserRole.OWNER &&
        booking?.bookingStatus === BookingStatus.RENTER_RATED) ||
      (userRole === UserRole.RENTER &&
        booking?.bookingStatus === BookingStatus.OWNER_RATED),
    [booking?.bookingStatus, userRole]
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
