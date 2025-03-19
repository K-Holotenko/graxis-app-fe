import { useSearchParams } from 'react-router-dom';

import { CategoriesFilter } from 'src/pages/SearchResultsPage/children/CategoriesFilter';
import { SearchBar } from 'src/pages/SearchResultsPage/children/SearchBar';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';

import styles from './styles.module.scss';

export const TopContent = () => {
  const [searchParams] = useSearchParams();

  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;

  return (
    <div className={styles.topContentWrapper}>
      <SearchBar />
      {isMobile ? (
        <>
          <CategoriesFilter />
          {/* TODO: This text should only appear after user hit enter */}
          <p className={styles.searchQuery}>
            Результати за запитом &quot;{searchParams.get('q')}&quot;
          </p>
        </>
      ) : (
        <>
          {/* TODO: This text should only appear after user hit enter */}
          <p className={styles.searchQuery}>
            Результати за запитом &quot;{searchParams.get('q')}&quot;
          </p>
          <CategoriesFilter />
        </>
      )}
    </div>
  );
};
