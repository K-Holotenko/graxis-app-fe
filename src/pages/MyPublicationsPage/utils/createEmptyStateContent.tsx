import { ROUTES } from 'src/router/routes';
import { MyPublicationsEmptyState } from 'src/pages/MyPublicationsPage/children/MyPublicationsEmptyState';

const emptyStateContentMap: Record<
  number,
  {
    message: string;
    buttonLabel: string;
    navigateTo: string;
    showIcon?: boolean;
  }
> = {
  1: {
    message: 'У вас ще немає публікацій. Додайте першу річ!',
    buttonLabel: 'Додати оголошення',
    navigateTo: ROUTES.ADD_PUBLICATION,
    showIcon: true,
  },
  2: {
    message: 'Зараз у вас немає орендованих товарів. Додати перший?',
    buttonLabel: 'Переглянути оголошення',
    navigateTo: ROUTES.SEARCH_RESULTS,
  },
};

export const createEmptyState = (key: number) => {
  const {
    message,
    buttonLabel,
    showIcon = false,
    navigateTo,
  } = emptyStateContentMap[key];

  return (
    <MyPublicationsEmptyState
      message={message}
      buttonLabel={buttonLabel}
      showIcon={showIcon}
      navigateTo={navigateTo}
    />
  );
};
