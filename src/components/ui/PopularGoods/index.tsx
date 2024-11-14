import PopularGoodCard from '../PopularGoodCard';
import './styles.scss';

import image1 from '../../../assets/images/first_card.svg';
import image2 from '../../../assets/images/second_card.svg';
import image3 from '../../../assets/images/third_card.svg';
import image4 from '../../../assets/images/fourth_card.svg';
import image5 from '../../../assets/images/fifth_card.svg';
import image6 from '../../../assets/images/sixth_card.svg';
import image7 from '../../../assets/images/seventh_card.svg';
import image8 from '../../../assets/images/eighth_card.svg';

// TEMPORARY, should be stored in store
const goods = [
  {
    id: 1,
    image: image1,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
    isFavorite: false,
  },
  {
    id: 2,
    image: image2,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
    isFavorite: true,
  },
  {
    id: 3,
    image: image3,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
    isFavorite: false,
  },
  {
    id: 4,
    image: image4,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
    isFavorite: false,
  },
  {
    id: 5,
    image: image5,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
    isFavorite: true,
  },
  {
    id: 6,
    image: image6,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
    isFavorite: false,
  },
  {
    id: 7,
    image: image7,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
    isFavorite: false,
  },
  {
    id: 8,
    image: image8,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
    isFavorite: true,
  },
];

const PopularGoods = () => (
  <>
    <h2 className="popular-goods__title">Популярні товари</h2>
    <div className="popular-goods">
      {goods.map((good) => (
        <PopularGoodCard
          key={good.id}
          image={good.image}
          name={good.name}
          rating={good.rating}
          price={good.price}
          isFavorite={good.isFavorite}
          onFavoriteToggle={() => {}}
        />
      ))}
    </div>
  </>
);

export default PopularGoods;
