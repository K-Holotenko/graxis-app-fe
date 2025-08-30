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
    {Array.from({ length: numberOfCards }, (_, index) => (
      <div key={`card-skeleton-${index + 1}`} className={styles.cardSkeleton}>
        <Skeleton.Image active className={styles.picturesSkeleton} />
        <Skeleton active paragraph={{ rows: 1 }} />
      </div>
    ))}
  </CardsGridLayout>
);
