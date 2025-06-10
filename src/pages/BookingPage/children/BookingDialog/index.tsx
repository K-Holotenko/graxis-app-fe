import { Col, Row } from 'antd';

import { Button } from 'src/components/Button';
import { ButtonTypes, SCREEN_WIDTH } from 'src/config/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking';
import { changeBookingStatus } from 'src/services/Booking';
import { useBookingStore } from 'src/stores/bookingStore';
import { usePublication } from 'src/hooks/usePublication';

import styles from './styles.module.scss';

export const BookingDialog = () => {
  const { width } = useWindowSize();
  const isTablet = width < SCREEN_WIDTH.XL;
  const { booking } = useBookingStore();
  const { isEditable } = usePublication();

  return (
    <Row className={styles.bookingDialog}>
      <Col xs={isTablet ? 24 : 14} className={styles.buttonsContainer}>
        {!isEditable && (
          <Button
            type={ButtonTypes.default}
            className={styles.button}
            label="Скасувати"
            onClick={() =>
              changeBookingStatus(booking!.id, BookingStatus.CANCELLED)
            }
          />
        )}
        {isEditable && (
          <>
            <Button
              type={ButtonTypes.default}
              className={styles.button}
              label="Відхилити запит"
              onClick={() => {}}
            />
            <Button
              type={ButtonTypes.primary}
              className={styles.button}
              label="Підтвердити запит"
              onClick={() => {
                changeBookingStatus(booking!.id, BookingStatus.CONFIRMED);
              }}
            />
          </>
        )}
      </Col>
    </Row>
  );
};
