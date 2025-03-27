import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InputRef } from 'antd';

import { CategoriesFilter } from 'src/pages/SearchResultsPage/children/CategoriesFilter';
import { SearchBar } from 'src/pages/SearchResultsPage/children/SearchBar';
import { useWindowSize } from 'src/hooks/useWindowSize';
import { SCREEN_WIDTH } from 'src/config/constants';

import styles from './styles.module.scss';

export const TopContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useWindowSize();
  const isMobile = width < SCREEN_WIDTH.MD;
  const searchedTitle = searchParams.get('q');
  const isSearchApplied = searchParams.get('q')?.trim().length;
  const inputRef = useRef<InputRef | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const inputValue = inputRef.current.input?.value.trim() || '';
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (inputValue) {
        newSearchParams.set('q', inputValue);
      } else {
        newSearchParams.delete('q');
      }
      setSearchParams(newSearchParams);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
