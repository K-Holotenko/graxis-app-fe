import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const { Paragraph } = Typography;

interface CategoriesCard {
  id: string;
  title: string;
  image: string;
  link: string;
  icon?: string;
}

interface CategoriesSectionCardProps {
  categories: CategoriesCard;
  isLast?: boolean;
}

export const CategoriesSectionCard = ({
  categories,
  isLast = false,
}: CategoriesSectionCardProps) => (
  <Link
    to={categories.link}
    className={styles.categoriesLink}
    data-testid="categories-link"
  >
    <Card
      hoverable
      className={`${styles.categoriesCard} ${isLast && styles.lastCard}`}
      data-testid="categories-card"
    >
      <img
        alt={categories.title}
        src={categories.image}
        className={styles.categoriesImg}
      />
      {categories.icon ? (
        <div className={styles.categoriesWrap}>
          <Paragraph className={styles.categoriesTitle}>
            <span dangerouslySetInnerHTML={{ __html: categories.title }} />
          </Paragraph>
          <img
            alt={categories.title}
            src={categories.icon}
            className={styles.telegramIcon}
          />
        </div>
      ) : (
        <Paragraph className={styles.categoriesTitle}>
          {categories.title}
        </Paragraph>
      )}
    </Card>
  </Link>
);
