import { memo } from 'react';
import { Skeleton } from 'antd';

import styles from './styles.module.scss';

const PriceSkeletonComponent = () => (
  <>
    <div className={styles.priceSkeletonWrapper}>
      {[...Array(3)].map(() => (
        <Skeleton.Node
          key={new Date().getTime()}
          active
          className={styles.priceSkeleton}
        />
      ))}
    </div>
    <div className={styles.calendarSkeltonWrapper}>
      <Skeleton.Node active className={styles.calendarSkelton} />
    </div>
  </>
);

export const PriceSkeleton = memo(PriceSkeletonComponent);

export const MapSkeleton = () => (
  <Skeleton.Image active className={styles.mapSkeleton} />
);

export const PublicationNameSkeleton = ({
  isLoading,
}: {
  isLoading: boolean;
}) => <Skeleton loading={isLoading} active paragraph={{ rows: 2 }} />;

export const DescriptionSkeleton = ({ isLoading }: { isLoading: boolean }) => (
  <Skeleton loading={isLoading} active paragraph={{ rows: 5 }} />
);

export const CarouselSkeleton = () => (
  <Skeleton.Image active className={styles.picturesSkeleton} />
);

export const BreadcrumbsSkeleton = ({ isLoading }: { isLoading: boolean }) => (
  <Skeleton
    loading={isLoading}
    active
    paragraph={{ rows: 0, className: styles.breadcrumbsSkeleton }}
  />
);
