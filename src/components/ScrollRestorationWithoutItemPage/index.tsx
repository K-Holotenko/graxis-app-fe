import { matchPath, ScrollRestoration, useLocation } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';

export const ScrollRestorationWithoutItemPage = () => {
  const { pathname } = useLocation();

  const isItemPage = matchPath(ROUTES.ITEM, pathname);

  if (isItemPage) {
    return null;
  }

  return <ScrollRestoration />;
};
