import { Heading } from 'src/components/Heading';
import Star from 'src/assets/icons/star-icon.svg?react';
import Circle from 'src/assets/icons/yellow-circle-icon.svg?react';
import { TEXT } from 'src/config/constants';

import styles from './styles.module.scss';

interface ProductData {
  title: string;
  category: string;
  rating: string;
  feedbackCount: number;
}

interface ItemNameProps {
  productData: ProductData;
}

export const ItemName = ({ productData }: ItemNameProps) => (
  <section className={styles.itemNameWrapper}>
    <Heading level={2} className={styles.itemName}>
      {productData.title}
    </Heading>
    <p className={styles.category}>{productData.category}</p>
    <div className={styles.descriptionWrapper}>
      <div className={styles.description}>
        <Star />
        <span className={styles.rate}>{productData.rating}</span>
      </div>
      <div className={styles.description}>
        <Circle />
        <span className={styles.feedback}>
          {productData.feedbackCount} {TEXT.FEEDBACK_AMOUNT}
        </span>
      </div>
    </div>
  </section>
);
