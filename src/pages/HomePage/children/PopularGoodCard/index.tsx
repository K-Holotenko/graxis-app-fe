import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';

import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

export interface PopularGoodCardProps {
  image: string;
  name: string;
  rating: number;
  price: number;
}

export const PopularGoodCard = ({
  image,
  name,
  rating,
  price,
}: PopularGoodCardProps) => (
  <Card
    className={styles.productCard}
    hoverable
    cover={<img src={image} alt={name} className={styles.productImage} />}
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
          {price} {TEXT.CURRENCY_PER_TIME}
        </span>
      </div>
    </div>
  </Card>
);
