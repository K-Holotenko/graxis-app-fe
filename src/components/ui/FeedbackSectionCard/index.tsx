import { Avatar, Card, Flex, Rate, Typography } from 'antd';
import feedbackAvatar from 'assets/images/feedback-avatar.jpg';
import './styles.scss';

const { Meta } = Card;

interface Feedback {
  id: string;
  title: string;
  image: string;
  author_name: string;
  author_surname: string;
  review: string;
  rating: number;
  createdAt: string;
}

interface FeedbackSectionCardProps {
  feedback: Feedback;
}

export const FeedbackSectionCard = ({ feedback }: FeedbackSectionCardProps) => (
  <Card key={feedback.id} className="feedback-card">
    <Flex justify="space-between" align="center">
      <Rate className="feedback-rate" disabled defaultValue={feedback.rating} />
      <Typography className="feedback-date">
        {new Date(feedback.createdAt).toLocaleDateString('uk-UA', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </Typography>
    </Flex>
    <Meta
      title={feedback.title}
      description={
        <Flex vertical justify="space-between" className="feedback-descr-wrap">
          <Typography className="feedback-review">{feedback.review}</Typography>
          <Flex gap={20} align="center">
            <Avatar src={feedbackAvatar} className="feedback-avatar" />
            <Typography className="feedback-name">
              {feedback.author_name}
              <br /> {feedback.author_surname}
            </Typography>
          </Flex>
        </Flex>
      }
    />
  </Card>
);
