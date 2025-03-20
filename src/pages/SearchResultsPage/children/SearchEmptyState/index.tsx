import { useSearchParams } from 'react-router-dom';

import { Button } from 'src/components/Button';
import NoSearchResults from 'src/assets/icons/no-search-results.svg?react';

import styles from './styles.module.scss';

export const SearchEmptyState = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className={styles.container}>
      <p className={styles.message}>За вашим запитом нічого не знайдено</p>
      <NoSearchResults className={styles.noSearchResultsImg} />
      <Button
        className={styles.button}
        label="Очистити фільтри"
        onClick={() => setSearchParams({})}
      />
    </div>
  );
};
