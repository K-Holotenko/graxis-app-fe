import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../../router/routes';
import { ForgotPasswordLink } from '../../../components/ui/ForgotPasswordLink';
import { HaveAccountLink } from '../../../components/ui/HaveAccountLink';

export const Footer = () => {
  const location = useLocation();

  return location.pathname === ROUTES.LOGIN ? (
    <ForgotPasswordLink />
  ) : (
    <HaveAccountLink />
  );
};
