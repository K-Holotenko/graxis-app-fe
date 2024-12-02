import image1 from 'src/assets/images/first_card.jpg';
import image2 from 'src/assets/images/second_card.jpg';
import image3 from 'src/assets/images/third_card.jpg';
import image4 from 'src/assets/images/fourth_card.jpg';
import image5 from 'src/assets/images/fifth_card.jpg';
import image6 from 'src/assets/images/sixth_card.jpg';
import image7 from 'src/assets/images/seventh_card.jpg';
import image8 from 'src/assets/images/eighth_card.jpg';
import './styles.scss';
import { PopularGoodCard } from 'src/components/ui/PopularGoodCard';

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

export const PopularGoods = () => (
  <>
    <h2 className="popular-goods-title">Популярні товари</h2>
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
