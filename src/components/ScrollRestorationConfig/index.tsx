import { matchPath, ScrollRestoration, Location } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';

const getKey = (location: Location) => {
  const publicationMatch = matchPath(ROUTES.PUBLICATION, location.pathname);
  const searchMatch = matchPath(ROUTES.SEARCH_RESULTS, location.pathname);
  const hasQueryParams = new URLSearchParams(location.search).size > 0;

  if (publicationMatch) {
    return location.pathname;
  }

  if (searchMatch || hasQueryParams) {
    return null;
  }

  return location.pathname + location.search;
};

export const ScrollRestorationConfig = () => (
  <ScrollRestoration getKey={getKey} />
);
