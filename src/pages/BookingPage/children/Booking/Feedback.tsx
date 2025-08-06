import { ConfigProvider, Rate } from 'antd';

import { TextArea } from 'src/components/TextArea';
import { theme } from 'src/config/theme';
import { useBookingStore } from 'src/stores/bookingStore';
import { useBookingStatus } from 'src/hooks/useBookingStatus';
import { BookingStatus } from 'src/pages/BookingPage/children/Booking/utils';

import styles from './styles.module.scss';

export const Feedback = () => {
  const { setFeedback, setRating } = useBookingStore();
  const { bookingStatus } = useBookingStatus();

  if (bookingStatus === BookingStatus.RATED) {
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
