import { Card } from 'antd';
import { StarFilled } from '@ant-design/icons';

import './styles.scss';
import { TEXT } from 'src/config/constants';

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
    className="product-card"
    hoverable
    cover={<img src={image} alt={name} className="product-image" />}
  >
    {/* <div className="image-wrapper">
    </div> */}
    <div className="card-info">
      <span className="nameCardInfo">{name}</span>
      <div className="rating">
        <StarFilled className="star-icon" />
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    </div>
    <div className="card-bottom">
      <span className="price">
        {price} {TEXT.CURRENCY_PER_TIME}
      </span>
    </div>
  </Card>
);
