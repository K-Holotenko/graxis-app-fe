import { Col, Row } from 'antd';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/Button';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useBookingStore } from 'src/stores/bookingStore';
import { useAuthStore } from 'src/stores/authStore';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking/utils';

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
  const { booking, rating, feedback, updateBookingStatus } = useBookingStore();

  const navigate = useNavigate();

  const isTablet = useMemo(() => width < SCREEN_WIDTH.XL, [width]);

  const userRole: UserRole = getUserRole(booking, user?.id);
  const actions: BookingAction[] = getCurrentActions(
    booking?.bookingStatus === BookingStatus.BOOKED
      ? null
      : booking?.bookingStatus || null,
    userRole,
    updateBookingStatus
  );

  const isFeedbackValid = useMemo(
    () => rating || (rating && feedback),
    [rating, feedback]
  );

  if (actions.length === 0) {
    return null;
  }

  return (
    <Row className={styles.bookingDialog}>
      <Col xs={isTablet ? 24 : 14} className={styles.buttonsContainer}>
        {actions.map((action) => (
          <Button
            key={action.id}
            type={action.type}
            className={styles.button}
            label={action.label}
            onClick={() =>
              action.action(
                booking!.id,
                navigate,
                rating,
                feedback,
                booking?.publication.title
              )
            }
            isDisabled={
              booking?.bookingStatus === BookingStatus.RETURNED &&
              !isFeedbackValid
            }
          />
        ))}
      </Col>
    </Row>
  );
};
