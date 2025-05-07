import { matchPath, ScrollRestoration, useLocation } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';

export const ScrollRestorationWithoutPublicationPage = () => {
  const { pathname } = useLocation();

  const isItemPage = matchPath(ROUTES.PUBLICATION, pathname);

  if (isItemPage) {
    return null;
  }

  return <ScrollRestoration />;
};
