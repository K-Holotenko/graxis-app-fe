import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';
import { getDisplayPrice } from './utils/config';

export interface PopularGoodCardProps {
  id: number | string;
  image: string;
  name: string;
  rating: number;
  price: { price: number; pricingPeriod: string };
}

export const PopularGoodCard = ({
  id,
  image,
  name,
  rating,
  price,
}: PopularGoodCardProps) => {
  const navigate = useNavigate();
  const displayPrice = getDisplayPrice(price);

  const handleCardClick = () => {
    navigate(`/item/${id}`);
  };

  return (
    <Card
      className={styles.productCard}
      hoverable
      cover={<img src={image} alt={name} className={styles.productImage} />}
      onClick={handleCardClick}
    >
      <div className={styles.cardDescription}>
        <div className={styles.cardInfo}>
          <span className={styles.cardName}>{name}</span>
          <div className={styles.rating}>
            <StarFilled className={styles.starIcon} />
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className={styles.cardBottom}>
          <span className={styles.price}>
            {displayPrice?.value} {TEXT.UAH} / {displayPrice?.period}
          </span>
        </div>
      </div>
    </Card>
  );
};
