import { matchPath, ScrollRestoration, useLocation } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';

export const ScrollRestorationConfig = () => {
  const { pathname } = useLocation();

  const isItemPage = matchPath(ROUTES.PUBLICATION, pathname);
  const searchPage = matchPath(ROUTES.SEARCH_RESULTS, pathname);

  if (isItemPage || searchPage) {
    return null;
  }

  return <ScrollRestoration />;
};
