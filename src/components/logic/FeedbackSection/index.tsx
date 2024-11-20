import { Typography } from 'antd';
import { FeedbackSectionCarousel } from 'components/ui/FeedbackSectionCarousel';
import { FEEDBACK_SECTION } from './utils/config';
import styles from './styles.module.scss';

const { Title } = Typography;

export const FeedbackSection = () => (
  <section className={styles['feedback-section']}>
    <Title level={4} className={styles['feedback-title']}>
      {FEEDBACK_SECTION.TITLE}
    </Title>
    <FeedbackSectionCarousel />
  </section>
);
