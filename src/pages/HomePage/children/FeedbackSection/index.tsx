import { FeedbackSectionCarousel } from 'src/pages/HomePage/children/FeedbackSectionCarousel';
import { TEXT } from 'src/config/constants';
import { Heading } from 'src/components/Heading';

import styles from './styles.module.scss';

export const FeedbackSection = () => (
  <section className={styles.feedbackSection} data-testid="feedback-section">
    <div className={styles.feedbackWrap}>
      <Heading level={2} className={styles.heading}>
        {TEXT.FEEDBACKS}
      </Heading>
      <FeedbackSectionCarousel />
    </div>
  </section>
);
