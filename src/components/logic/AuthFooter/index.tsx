import { useLocation } from 'react-router-dom';

import { ROUTES } from 'router/routes';
import { HaveAccountLink } from 'components/ui/HaveAccountLink';
import { NoAccountLink } from 'components/ui/NoAccountLink';

export const AuthFooter = () => {
  const location = useLocation();

  return location.pathname === ROUTES.LOGIN ? (
    <NoAccountLink />
  ) : (
    <HaveAccountLink />
  );
};
