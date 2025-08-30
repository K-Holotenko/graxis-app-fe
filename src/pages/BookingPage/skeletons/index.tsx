import { Skeleton } from 'antd';
import { memo } from 'react';

import styles from './styles.module.scss';

const StepsSkeletonComponent = () => (
  <div className={styles.stepContainer}>
    {Array.from({ length: 7 }, (_, index) => (
      <div key={`skeleton-step-${index + 1}`}>
        <Skeleton.Node active className={styles.step} />
        {index < 6 && (
          <div className={styles.connectionContainer}>
            <Skeleton.Node active className={styles.connection} />
          </div>
        )}
      </div>
    ))}
  </div>
);

export const StepsSkeleton = memo(StepsSkeletonComponent);

export const DetailsSkeleton = () => (
  <Skeleton.Node active className={styles.details} />
);

export const CardSkeleton = () => (
  <Skeleton.Node active className={styles.card} />
);
