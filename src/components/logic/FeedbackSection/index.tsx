import { FeedbackSectionCarousel } from 'src/components/ui/FeedbackSectionCarousel';
import { HomeSectionTitle } from 'src/components/ui/HomeSectionTitle';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

export const FeedbackSection = () => (
  <section className={styles.feedbackSection} data-testid="feedback-section">
    <div className={styles.feedbackWrap}>
      <HomeSectionTitle title={TEXT.FEEDBACKS} />
      <FeedbackSectionCarousel />
    </div>
  </section>
);
