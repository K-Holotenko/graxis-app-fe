import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InputRef } from 'antd';

import { buildParams } from 'src/pages/SearchResultsPage/utils/config';
import { CategoriesFilter } from 'src/pages/SearchResultsPage/children/CategoriesFilter';
import { SearchBar } from 'src/pages/SearchResultsPage/children/SearchBar';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';
import { useCategories } from 'src/hooks/useCategories';

import styles from './styles.module.scss';

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;
  const searchedTitle = searchParams.get('title') || '';
  const isSearchApplied = (searchedTitle || '').trim().length > 0;
  const inputRef = useRef<InputRef | null>(null);
  const { categoriesTree } = useCategories();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const inputValue = inputRef.current.input?.value.trim() || '';
      const currentFrontendParams = new URLSearchParams(window.location.search);
      const frontendCategories = currentFrontendParams.getAll('categories');

      const { backendParams, frontendParams } = buildParams(
        frontendCategories,
        inputValue,
        categoriesTree
      );

      setSearchParams(backendParams);
      window.history.replaceState({}, '', `?${frontendParams.toString()}`);
    }
  };

  useEffect(() => {
    const titleFromUrl = searchParams.get('title') || '';

    if (inputRef.current && inputRef.current.input) {
      inputRef.current.input.value = titleFromUrl;
    }
  }, [searchParams]);

  return (
    <div className={styles.topContentWrapper}>
      <SearchBar inputRef={inputRef} onKeyDown={handleKeyDown} />
      {isMobile ? (
        <>
          <CategoriesFilter />
          {isSearchApplied && (
            <p className={styles.searchQuery}>
              Результати за запитом &quot;{searchedTitle}&quot;
            </p>
          )}
        </>
      ) : (
        <>
          {isSearchApplied && (
            <p className={styles.searchQuery}>
              Результати за запитом &quot;{searchedTitle}&quot;
            </p>
          )}
          <CategoriesFilter />
        </>
      )}
    </div>
  );
};
