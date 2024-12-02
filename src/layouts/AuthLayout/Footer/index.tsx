import { useLocation } from 'react-router-dom';

import { ForgotPasswordLink } from 'src/components/ui/ForgotPasswordLink';
import { HaveAccountLink } from 'src/components/ui/HaveAccountLink';
import { ROUTES } from 'src/router/routes';

export const Footer = () => {
  const location = useLocation();

  return location.pathname === ROUTES.LOGIN ? (
    <ForgotPasswordLink />
  ) : (
    <HaveAccountLink />
  );
};
