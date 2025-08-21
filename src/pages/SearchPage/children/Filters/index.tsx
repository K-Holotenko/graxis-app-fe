import { Skeleton } from 'antd';
import { useSearchParams } from 'react-router-dom';

import { CategoriesFilter } from 'src/pages/SearchPage/children/CategoriesFilter';
import { SearchBar } from 'src/pages/SearchPage/children/SearchBar';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';
import { Loadable } from 'src/components/Loadable';
import { useCategoriesStore } from 'src/stores/categoriesStore';

import styles from './styles.module.scss';

const SearchQueryResults = ({
  searchedTitle,
  isSearchApplied,
}: {
  searchedTitle: string | null;
  isSearchApplied: boolean;
}) => {
  if (!isSearchApplied) return null;

  return (
    <p className={styles.searchQuery}>
      Результати за запитом &quot;{searchedTitle}&quot;
    </p>
  );
};

export const Filters = () => {
  const [searchParams] = useSearchParams();

  const { isLoading } = useCategoriesStore();
  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;

  const searchedTitle = searchParams.get('title');
  const isSearchApplied = Boolean(searchParams.get('title')?.trim().length);

  return (
    <div className={styles.topContentWrapper}>
      <SearchBar />
      {isMobile ? (
        <>
          <Loadable
            skeleton={
              <Skeleton.Input
                active
                size="large"
                style={{ width: '100%', height: 48 }}
              />
            }
            component={() => <CategoriesFilter />}
            isLoading={isLoading}
          />
          <SearchQueryResults
            searchedTitle={searchedTitle}
            isSearchApplied={isSearchApplied}
          />
        </>
      ) : (
        <>
          <SearchQueryResults
            searchedTitle={searchedTitle}
            isSearchApplied={isSearchApplied}
          />
          <Loadable
            skeleton={
              <Skeleton.Input
                active
                size="large"
                style={{ width: 425, height: 48 }}
              />
            }
            component={() => <CategoriesFilter />}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
