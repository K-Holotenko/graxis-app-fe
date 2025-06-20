import { Col, Row } from 'antd';

import { Button } from 'src/components/Button';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { useBookingStore } from 'src/stores/bookingStore';
import { useUserStore } from 'src/stores/userStore';
import { useBookingStatus } from 'src/hooks/useBookingStatus';

import styles from './styles.module.scss';
import {
  getCurrentActions,
  getUserRole,
  UserRole,
  type BookingAction,
} from './utils';

export const BookingDialog = () => {
  const { width } = useWindowSize();
  const isTablet = width < SCREEN_WIDTH.XL;
  const { booking } = useBookingStore();
  const { user } = useUserStore();

  const userRole: UserRole = getUserRole(booking, user?.id);
  const { bookingStatus } = useBookingStatus();

  const actions: BookingAction[] = getCurrentActions(bookingStatus, userRole);
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
            onClick={() => action.action(booking!.id)}
            isDisabled={action.isDisabled}
          />
        ))}
      </Col>
    </Row>
  );
};
