import { CardsGridLayout } from 'src/layouts/CardsGridLayout';
import { PopularGoodCard } from 'src/pages/HomePage/children/PopularGoodCard';
import image1 from 'src/assets/images/first_card.jpg';
import image2 from 'src/assets/images/second_card.jpg';
import image3 from 'src/assets/images/third_card.jpg';
import image4 from 'src/assets/images/fourth_card.jpg';
import image5 from 'src/assets/images/fifth_card.jpg';
import image6 from 'src/assets/images/sixth_card.jpg';
import image7 from 'src/assets/images/seventh_card.jpg';
import image8 from 'src/assets/images/eighth_card.jpg';

// TEMPORARY, should be stored in store
const mockedCards = [
  {
    id: 1,
    image: image1,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
  },
  {
    id: 2,
    image: image2,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
  },
  {
    id: 3,
    image: image3,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
  },
  {
    id: 4,
    image: image4,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
  },
  {
    id: 5,
    image: image5,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
  },
  {
    id: 6,
    image: image6,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
  },
  {
    id: 7,
    image: image7,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
  },
  {
    id: 8,
    image: image8,
    name: 'Назва товарів',
    rating: 4.8,
    price: 400,
  },
];

const duplicatedPublications = Array(2).fill(mockedCards).flat();

export const PublicationsSection = () => (
  <CardsGridLayout>
    {duplicatedPublications.map((publication) => (
      <PopularGoodCard
        id={publication.id}
        key={publication.id}
        image={publication.image}
        name={publication.name}
        rating={publication.rating}
        price={publication.price}
      />
    ))}
  </CardsGridLayout>
);
