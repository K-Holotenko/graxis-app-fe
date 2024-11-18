import { useLocation } from 'react-router-dom';

import { HaveAccountLink } from 'src/components/ui/HaveAccountLink';
import { NoAccountLink } from 'src/components/ui/NoAccountLink';
import { ROUTES } from 'src/router/routes';

export const AuthFooter = () => {
  const location = useLocation();

  return location.pathname === ROUTES.LOGIN ? (
    <NoAccountLink />
  ) : (
    <HaveAccountLink />
  );
};
