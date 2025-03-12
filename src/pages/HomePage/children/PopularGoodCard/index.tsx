import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

export interface PopularGoodCardProps {
  id: number;
  image: string;
  name: string;
  rating: number;
  price: number;
}

export const PopularGoodCard = ({
  id,
  image,
  name,
  rating,
  price,
}: PopularGoodCardProps) => {
  const navigate = useNavigate();

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
            {price} {TEXT.CURRENCY_PER_TIME}
          </span>
        </div>
      </div>
    </Card>
  );
};
