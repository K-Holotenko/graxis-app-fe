import { Skeleton } from 'antd';
import { memo } from 'react';

import styles from './styles.module.scss';

const StepsSkeletonComponent = () => (
  <div key={new Date().getTime()} className={styles.stepContainer}>
    {[...Array(7)].map((_, index) => (
      <>
        <Skeleton.Node
          active
          className={styles.step}
          key={new Date().getTime()}
        />
        {index < 6 && (
          <div className={styles.connectionContainer}>
            <Skeleton.Node active className={styles.connection} />
          </div>
        )}
      </>
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
