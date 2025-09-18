import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/Button';
import NoMyPublicationsImg from 'src/assets/icons/no-my-publications.svg?react';
import PlusIcon from 'src/assets/icons/plus-icon.svg?react';
import { ROUTES } from 'src/router/routes';
import { PublicationFilters } from 'src/stores/myPublicationStore';

import styles from './styles.module.scss';

interface MyPublicationsEmptyStateProps {
  message: string;
  buttonLabel?: string;
  route?: string;
  showIcon?: boolean;
  showButton?: boolean;
}

export const statusToEmptyStatePropsMap: Partial<
  Record<PublicationFilters, MyPublicationsEmptyStateProps>
> = {
  [PublicationFilters.LISTED]: {
    message: 'У вас ще немає публікацій. Додайте першу річ!',
    buttonLabel: 'Додати оголошення',
    route: ROUTES.ADD_PUBLICATION,
    showIcon: true,
    showButton: true,
  },
  [PublicationFilters.RENTED_OUT]: {
    message: 'Наразі жоден із ваших товарів не орендовано',
  },
  [PublicationFilters.RENTING]: {
    message: 'Зараз у вас немає орендованих товарів. Додати перший?',
    buttonLabel: 'Переглянути оголошення',
    route: ROUTES.SEARCH_RESULTS,
    showButton: true,
  },
};

export const MyPublicationsEmptyState = ({
  message,
  buttonLabel,
  route,
  showIcon,
  showButton,
}: MyPublicationsEmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <NoMyPublicationsImg className={styles.noMyPublicationsImg} />
      <p className={styles.message}>{message}</p>
      {showButton && route && (
        <Button
          className={styles.button}
          label={buttonLabel}
          icon={showIcon ? <PlusIcon /> : undefined}
          iconPosition="end"
          onClick={() => navigate(route)}
        />
      )}
    </div>
  );
};
