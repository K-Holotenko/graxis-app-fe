import { useNavigate } from 'react-router-dom';

import PageNotFound from 'src/assets/images/page-not-found.svg?react';
import { ROUTES } from 'src/router/routes';
import { Button } from 'src/components/Button';
import { AppLayout } from 'src/layouts/AppLayout';
import { ButtonTypes } from 'src/config/constants';

import styles from './styles.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <AppLayout>
      <div className={styles.container}>
        <PageNotFound className={styles.pageNotFound} />
        <p className={styles.text}>Упс! Сторінка не існує.</p>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            type={ButtonTypes.default}
            label="Назад"
            onClick={handleBackClick}
          />
          <Button
            className={styles.button}
            label="На головну"
            onClick={() => navigate(ROUTES.HOME)}
          />
        </div>
      </div>
    </AppLayout>
  );
};
