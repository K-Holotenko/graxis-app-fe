import { CategoriesSectionCard } from 'src/components/ui/CategoriesSectionCard';
import { CATEGORIES_SECTION_CARD } from 'src/components/ui/CategoriesSectionCard/utils/config';
import { TEXT } from 'src/config/constants';
import { HomeSectionTitle } from 'src/components/ui/HomeSectionTitle';

import styles from './styles.module.scss';

export const CategoriesSection = () => (
  <section
    className={styles.categoriesSection}
    data-testid="categories-section"
  >
    <div className={styles.categoriesContainer}>
      <HomeSectionTitle title={TEXT.CATEGORIES_SECTION_TITLE} />
      <ul className={styles.categoriesList}>
        {CATEGORIES_SECTION_CARD.map((categories, index) => (
          <li key={categories.id}>
            <CategoriesSectionCard
              categories={categories}
              isLast={index === CATEGORIES_SECTION_CARD.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);
