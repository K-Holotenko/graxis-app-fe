import { Skeleton } from 'antd';
import { Fragment, memo } from 'react';

import styles from './styles.module.scss';

const StepsSkeletonComponent = () => (
  <div className={styles.stepContainer}>
    {[...Array(7)].map((_, index) => (
      <Fragment key={`${index + 1}-skeleton`}>
        <Skeleton.Node active className={styles.step} />
        {index < 6 && (
          <div className={styles.connectionContainer}>
            <Skeleton.Node active className={styles.connection} />
          </div>
        )}
      </Fragment>
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
