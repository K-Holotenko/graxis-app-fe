import { useNavigate } from 'react-router-dom';

import PageNotFound from 'src/assets/images/page-not-found.svg?react';
import { ROUTES } from 'src/router/routes';
import { Button } from 'src/components/Button';
import { AppLayout } from 'src/layouts/AppLayout';

import styles from './styles.module.scss';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className={styles.container}>
        <PageNotFound className={styles.pageNotFound} />
        <p className={styles.text}>
          Упс! Сторінка не існує, або доступна тільки для авторизованих
          користувачів
        </p>
        <Button
          className={styles.button}
          label="На головну"
          onClick={() => navigate(ROUTES.HOME)}
        />
      </div>
    </AppLayout>
  );
};
