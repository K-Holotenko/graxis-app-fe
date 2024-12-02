import { Avatar, Card, Flex, Rate, Typography } from 'antd';

import feedbackAvatar from 'src/assets/images/feedback-avatar.jpg';

import styles from './styles.module.scss';

const { Meta } = Card;
const { Paragraph } = Typography;

interface Feedback {
  id: string;
  title: string;
  image: string;
  authorName: string;
  authorSurname: string;
  review: string;
  rating: number;
  createdAt: string;
}

interface FeedbackSectionCardProps {
  feedback: Feedback;
}

export const FeedbackSectionCard = ({ feedback }: FeedbackSectionCardProps) => (
  <Card className={styles['feedback-card']} data-testid="feedback-card">
    <Flex justify="space-between" align="center" wrap={false}>
      <Rate
        className={styles['feedback-rate']}
        disabled
        defaultValue={feedback.rating}
        data-testid="feedback-rate"
      />
      <Paragraph className={styles['feedback-date']}>
        {new Date(feedback.createdAt).toLocaleDateString('uk-UA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Paragraph>
    </Flex>
    <Meta
      title={
        <Paragraph className={styles['feedback-title']}>
          {feedback.title}
        </Paragraph>
      }
      description={
        <Flex
          vertical
          justify="space-between"
          className={styles['feedback-descr-wrap']}
        >
          <Paragraph className={styles['feedback-review']}>
            {feedback.review}
          </Paragraph>
          <Flex gap={20} align="center">
            <Avatar
              src={feedbackAvatar}
              className={styles['feedback-avatar']}
              data-testid="feedback-avatar"
            />
            <Paragraph className={styles['feedback-name']}>
              {feedback.authorName}
              <br /> {feedback.authorSurname}
            </Paragraph>
          </Flex>
        </Flex>
      }
    />
  </Card>
);
