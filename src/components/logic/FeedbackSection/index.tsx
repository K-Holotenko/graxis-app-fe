import { Typography } from 'antd';
import { FeedbackSectionCarousel } from 'components/ui/FeedbackSectionCarousel';
import { FEEDBACK_SECTION } from './utils/config';
import './styles.scss';

export const FeedbackSection = () => (
  <section className="feedback-section">
    <Typography.Title level={4} className="feedback-title">
      {FEEDBACK_SECTION.TITLE}
    </Typography.Title>
    <FeedbackSectionCarousel />
  </section>
);
