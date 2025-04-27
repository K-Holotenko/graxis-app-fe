import { useNavigate, useRouteError } from 'react-router-dom';

import ErrorImg from 'src/assets/icons/error-icon.svg?react';
import { AppLayout } from 'src/layouts/AppLayout';
import { Button } from 'src/components/Button';
import { ROUTES } from 'src/router/routes';
import { Heading } from 'src/components/Heading';
import { ButtonTypes } from 'src/config/constants';

import styles from './styles.module.scss';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const error = useRouteError() as Error;

  return (
    <AppLayout>
      <div className={styles.container}>
        <ErrorImg className={styles.errorImg} />
        <Heading level={3} className={styles.title}>
          Ой, щось пішло не так...
        </Heading>
        <p className={styles.text}>
          Схоже, сталася помилка. Ми вже працюємо над тим, щоби все повернулося
          на свої місця. Спробуйте оновити сторінку або повернутися трохи
          пізніше.
        </p>
        <code className={styles.errorMessage}>{error.message}</code>
        <div className={styles.btnContainer}>
          <Button
            className={styles.button}
            label="На головну"
            onClick={() => navigate(ROUTES.HOME)}
          />
          <Button
            type={ButtonTypes.default}
            label="Оновити сторінку"
            onClick={() => window.location.reload()}
          />
        </div>
      </div>
    </AppLayout>
  );
};
