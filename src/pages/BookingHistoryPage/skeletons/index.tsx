import { Skeleton } from 'antd';

import styles from './styles.module.scss';

export const BookingHistorySkeleton = () => (
  <div className={styles.cardsContainer}>
    {Array.from({ length: 3 }, (_, index) => (
      <Skeleton.Node key={index} active className={styles.cardSkeleton} />
    ))}
  </div>
);
