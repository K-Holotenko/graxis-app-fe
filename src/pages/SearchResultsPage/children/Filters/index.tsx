import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InputRef } from 'antd';

import {
  buildParams,
  findCategoryPath,
  updateUrl,
} from 'src/pages/SearchResultsPage/utils/config';
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
  const [selectedValues, setSelectedValues] = useState<string[][]>([]);

  const handleCategoriesChange = (value: string[][]) => {
    setSelectedValues(value);
    const currentTitle = searchParams.get('title') || '';
    const frontendCategories = value.map((path) => path[path.length - 1]);

    const { backendParams, frontendParams } = buildParams(
      frontendCategories,
      currentTitle,
      categoriesTree
    );

    updateUrl(frontendParams, backendParams, setSearchParams);
  };

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

      updateUrl(frontendParams, backendParams, setSearchParams);
    }
  };

  useEffect(() => {
    const frontendCategories = searchParams.getAll('categories');

    if (frontendCategories.length > 0) {
      const restoredValues = frontendCategories
        .map((category) => findCategoryPath(category, categoriesTree))
        .filter(Boolean) as string[][];

      const { backendParams, frontendParams } = buildParams(
        frontendCategories,
        searchParams.get('title') || '',
        categoriesTree
      );

      setSelectedValues(restoredValues);
      updateUrl(frontendParams, backendParams, setSearchParams);
    }
  }, []);

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
          <CategoriesFilter
            selectedCategories={selectedValues}
            onChange={handleCategoriesChange}
          />
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
          <CategoriesFilter
            selectedCategories={selectedValues}
            onChange={handleCategoriesChange}
          />
        </>
      )}
    </div>
  );
};
