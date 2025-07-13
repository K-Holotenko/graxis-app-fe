import { Col, Row } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/Button';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useBookingStore } from 'src/stores/bookingStore';
import { useAuthStore } from 'src/stores/authStore';
import { useBookingStatus } from 'src/hooks/useBookingStatus';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking';

import styles from './styles.module.scss';
import {
  getCurrentActions,
  getUserRole,
  UserRole,
  type BookingAction,
} from './utils';

export const BookingDialog = () => {
  const { width } = useWindowSize();
  const { user } = useAuthStore();
  const { bookingStatus } = useBookingStatus();
  const { booking } = useBookingStore();

  const navigate = useNavigate();

  const isTablet = useMemo(() => width < SCREEN_WIDTH.XL, [width]);

  const userRole: UserRole = getUserRole(booking, user?.id);

  const actions: BookingAction[] = getCurrentActions(
    bookingStatus as Exclude<BookingStatus, BookingStatus.BOOKED>,
    userRole
  );
  const visibleActions = actions.filter((action) => action.isVisible);

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <Row className={styles.bookingDialog}>
      <Col xs={isTablet ? 24 : 14} className={styles.buttonsContainer}>
        {visibleActions.map((action) => (
          <Button
            key={action.id}
            type={action.type}
            className={styles.button}
            label={action.label}
            onClick={() => action.action(booking!.id, navigate)}
            isDisabled={action.isDisabled}
          />
        ))}
      </Col>
    </Row>
  );
};
