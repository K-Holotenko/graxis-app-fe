import { Avatar, Rate } from 'antd';

import styles from './styles.module.scss';

interface FeedbackCardProps {
  rate: number;
  date: string;
  title: string;
  description: string;
  author: {
    name: string;
    surname: string;
    avatarUrl: string;
  };
}

export const FeedbackCard = ({
  rate,
  date,
  title,
  description,
  author,
}: FeedbackCardProps) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <Rate
        className={styles.rate}
        disabled
        defaultValue={rate}
        data-testid="feedback-rate"
      />
      <div className={styles.date}>{date}</div>
    </div>
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
    <div className={styles.cardFooter}>
      <Avatar
        size={42}
        src={author.avatarUrl}
        className={styles.avatar}
        data-testid="feedback-avatar"
      />
      <div className={styles.name}>
        {author.name} <br />
        {author.surname}
      </div>
    </div>
  </div>
);
