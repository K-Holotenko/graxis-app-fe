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
  <Card className={styles.feedbackCard} data-testid="feedback-card">
    <Flex justify="space-between" align="center" wrap={false}>
      <Rate
        className={styles.feedbackRate}
        disabled
        defaultValue={feedback.rating}
        data-testid="feedback-rate"
      />
      <Paragraph className={styles.feedbackDate}>
        {new Date(feedback.createdAt).toLocaleDateString('uk-UA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Paragraph>
    </Flex>
    <Meta
      title={
        <Paragraph className={styles.feedbackTitle}>{feedback.title}</Paragraph>
      }
      description={
        <Flex
          vertical
          justify="space-between"
          className={styles.feedbackDescrWrap}
        >
          <Paragraph className={styles.feedbackReview}>
            {feedback.review}
          </Paragraph>
          <Flex gap={20} align="center">
            <Avatar
              src={feedbackAvatar}
              className={styles.feedbackAvatar}
              data-testid="feedback-avatar"
            />
            <Paragraph className={styles.feedbackName}>
              {feedback.authorName}
              <br /> {feedback.authorSurname}
            </Paragraph>
          </Flex>
        </Flex>
      }
    />
  </Card>
);
