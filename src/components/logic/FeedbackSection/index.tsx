import { Typography } from 'antd';

import { FeedbackSectionCarousel } from 'src/components/ui/FeedbackSectionCarousel';

import { FEEDBACK_SECTION } from './utils/config';
import styles from './styles.module.scss';

const { Title } = Typography;

export const FeedbackSection = () => (
  <section className={styles.feedbackSection} data-testid="feedback-section">
    <div className={styles.feedbackWrap}>
      <Title
        level={4}
        className={styles.feedbackTitle}
        data-testid="feedback-title"
      >
        {FEEDBACK_SECTION.TITLE}
      </Title>
      <FeedbackSectionCarousel />
    </div>
  </section>
);
