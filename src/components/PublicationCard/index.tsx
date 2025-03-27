import { Card, Tooltip } from 'antd';
import { StarFilled, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { theme } from 'src/config/theme';
import { PublicationCard as PublicationCardType } from 'src/services/PublicationService';

import styles from './styles.module.scss';
import { getDisplayPrice } from './utils/utils';

export interface PublicationCardProps {
  publicationCard: PublicationCardType;
}

export const PublicationCard = ({
  publicationCard: { id, thumbnailUrl, title, rate, reviewCount, price },
}: PublicationCardProps) => {
  const navigate = useNavigate();
  const displayPrice = getDisplayPrice(price);

  const textLength = 35;

  const handleCardClick = () => {
    navigate(`/item/${id}`);
  };

  const isTruncated = title.length > textLength;
  const truncatedTitle = isTruncated
    ? `${title.substring(0, textLength)}...`
    : title;
  const tooltip = isTruncated ? title : null;

  return (
    <Card
      className={styles.productCard}
      hoverable
      cover={
        <img src={thumbnailUrl} alt={title} className={styles.productImage} />
      }
      onClick={handleCardClick}
    >
      <div className={styles.activity}>
        <div className={`${styles.iconWrapper} ${styles.marginRight}`}>
          <EyeOutlined className={styles.icon} />
          <span className={styles.activityValue}>{reviewCount.toFixed(1)}</span>
        </div>
        <div className={styles.iconWrapper}>
          <StarFilled className={styles.icon} />
          <span className={styles.activityValue}>{rate.toFixed(1)}</span>
        </div>
      </div>

      <Tooltip title={tooltip} color={theme.primary}>
        <p className={styles.cardTitle}>{truncatedTitle}</p>
      </Tooltip>
      <p className={styles.price}>
        {displayPrice?.value} грн / {displayPrice?.period}
      </p>
    </Card>
  );
};
