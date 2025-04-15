import { ROUTES } from 'src/router/routes';
import { MyPublicationsEmptyState } from 'src/pages/MyPublicationsPage/children/MyPublicationsEmptyState';

export enum EmptyStateType {
  NO_PUBLICATIONS = 'NO_PUBLICATIONS',
  NO_RENTALS = 'NO_RENTALS',
}

const emptyStateContentMap: Record<
  EmptyStateType,
  {
    message: string;
    buttonLabel: string;
    route: string;
    showIcon?: boolean;
  }
> = {
  [EmptyStateType.NO_PUBLICATIONS]: {
    message: 'У вас ще немає публікацій. Додайте першу річ!',
    buttonLabel: 'Додати оголошення',
    route: ROUTES.ADD_PUBLICATION,
    showIcon: true,
  },
  [EmptyStateType.NO_RENTALS]: {
    message: 'Зараз у вас немає орендованих товарів. Додати перший?',
    buttonLabel: 'Переглянути оголошення',
    route: ROUTES.SEARCH_RESULTS,
  },
};

export const createEmptyState = (key: EmptyStateType) => {
  const {
    message,
    buttonLabel,
    showIcon = false,
    route,
  } = emptyStateContentMap[key];

  return (
    <MyPublicationsEmptyState
      message={message}
      buttonLabel={buttonLabel}
      showIcon={showIcon}
      route={route}
    />
  );
};
