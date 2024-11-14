import { Card } from 'antd';
import { StarFilled, HeartOutlined, HeartFilled } from '@ant-design/icons';

import './styles.scss';

interface PopularGoodCardProps {
  image: string;
  name: string;
  rating: number;
  price: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const PopularGoodCard = ({
  image,
  name,
  rating,
  price,
  isFavorite,
  onFavoriteToggle,
}: PopularGoodCardProps) => (
  <Card className="product-card" hoverable>
    <div className="image-wrapper">
      <img src={image} alt={name} className="product-image" />
      <span onClick={onFavoriteToggle} className="favorite-icon">
        {isFavorite ? (
          <HeartFilled className="filled-heart" />
        ) : (
          <HeartOutlined />
        )}
      </span>
    </div>
    <div className="card-info">
      <span>{name}</span>
      <div className="rating">
        <StarFilled className="star-icon" />
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    </div>
    <div className="card-bottom">
      <span className="price">{price} грн / год</span>
    </div>
  </Card>
);

export default PopularGoodCard;
