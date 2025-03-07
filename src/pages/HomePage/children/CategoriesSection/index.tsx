import { CategoriesSectionCard } from 'src/pages/HomePage/children/CategoriesSectionCard';
import { CATEGORIES_SECTION_CARD } from 'src/pages/HomePage/children/CategoriesSectionCard/utils/config';
import { TEXT } from 'src/config/constants';
import { Heading } from 'src/components/Heading';

import styles from './styles.module.scss';

export const CategoriesSection = () => (
  <section
    className={styles.categoriesSection}
    data-testid="categories-section"
  >
    <Heading level={2}>{TEXT.CATEGORIES_SECTION_TITLE}</Heading>
    <div className={styles.categoriesList}>
      {CATEGORIES_SECTION_CARD.map((categories, index) => (
        <CategoriesSectionCard
          key={categories.id}
          categories={categories}
          isLast={index === CATEGORIES_SECTION_CARD.length - 1}
        />
      ))}
    </div>
  </section>
);
