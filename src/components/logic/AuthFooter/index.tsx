import { useLocation } from 'react-router-dom';

import { ROUTES } from 'router/routes';

import { NoAccountLink } from 'components/ui/NoAccountLink';
import { HaveAccountLink } from 'components/ui/HaveAccountLink';

export const AuthFooter = () => {
  const location = useLocation();

  return location.pathname === ROUTES.LOGIN ? (
    <NoAccountLink />
  ) : (
    <HaveAccountLink />
  );
};
