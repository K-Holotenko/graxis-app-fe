import image1 from 'src/assets/images/first_card.jpg';
import image2 from 'src/assets/images/second_card.jpg';
import image3 from 'src/assets/images/third_card.jpg';
import image4 from 'src/assets/images/fourth_card.jpg';
import image5 from 'src/assets/images/fifth_card.jpg';
import image6 from 'src/assets/images/sixth_card.jpg';
import image7 from 'src/assets/images/seventh_card.jpg';
import image8 from 'src/assets/images/eighth_card.jpg';
import { PublicationCard } from 'src/components/PublicationCard';
import { TEXT } from 'src/config/constants';
import { Heading } from 'src/components/Heading';
import { CardsGridLayout } from 'src/layouts/CardsGridLayout';

import styles from './styles.module.scss';

// TEMPORARY, should be stored in store
const goods = [
  {
    id: '1',
    reviewCount: 4.8,
    thumbnailUrl: image1,
    title: 'Назва товарів',
    rate: 4.8,
    price: {
      price: 400,
      pricingPeriod: 'day',
    },
  },
  {
    id: '2',
    reviewCount: 4.8,
    thumbnailUrl: image2,
    title: 'Назва товарів',
    rate: 4.8,
    price: {
      price: 400,
      pricingPeriod: 'day',
    },
  },
  {
    id: '3',
    reviewCount: 4.8,
    thumbnailUrl: image3,
    title: 'Назва товарів',
    rate: 4.8,
    price: {
      price: 400,
      pricingPeriod: 'day',
    },
  },
  {
    id: '4',
    reviewCount: 4.8,
    thumbnailUrl: image4,
    title: 'Назва товарів',
    rate: 4.8,
    price: {
      price: 400,
      pricingPeriod: 'day',
    },
  },
  {
    id: '5',
    reviewCount: 4.8,
    thumbnailUrl: image5,
    title: 'Назва товарів',
    rate: 4.8,
    price: {
      price: 400,
      pricingPeriod: 'day',
    },
  },
  {
    id: '6',
    reviewCount: 4.8,
    thumbnailUrl: image6,
    title: 'Назва товарів',
    rate: 4.8,
    price: {
      price: 400,
      pricingPeriod: 'day',
    },
  },
  {
    id: '7',
    reviewCount: 4.8,
    thumbnailUrl: image7,
    title: 'Назва товарів',
    rate: 4.8,
    price: {
      price: 400,
      pricingPeriod: 'day',
    },
  },
  {
    id: '8',
    reviewCount: 4.8,
    thumbnailUrl: image8,
    title: 'Назва товарів',
    rate: 4.8,
    price: {
      price: 400,
      pricingPeriod: 'day',
    },
  },
];

export const PopularGoods = () => (
  <>
    <Heading level={2}>{TEXT.POPULAR_GOODS}</Heading>
    <section className={styles.popularGoodsSection}>
      <CardsGridLayout>
        {goods.map((good) => (
          <PublicationCard publicationCard={good} key={good.id} />
        ))}
      </CardsGridLayout>
    </section>
  </>
);
