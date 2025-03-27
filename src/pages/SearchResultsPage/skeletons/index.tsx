import { Skeleton } from 'antd';

import { CardsGridLayout } from 'src/layouts/CardsGridLayout';

import styles from './styles.module.scss';

interface PublicationsGridSkeletonProps {
  numberOfCards: number;
}

export const PublicationsGridSkeleton = ({
  numberOfCards,
}: PublicationsGridSkeletonProps) => (
  <CardsGridLayout>
    {[...Array(numberOfCards)].map(() => (
      <div key={new Date().toString()} className={styles.cardSkeleton}>
        <Skeleton.Image active className={styles.picturesSkeleton} />
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
    ))}
  </CardsGridLayout>
);
