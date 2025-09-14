import { useLocation, Navigate } from 'react-router-dom';

import { NewPasswordPage } from 'src/pages/NewPasswordPage';
import { ROUTES } from 'src/router/routes';

export const AuthActionHandler = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const mode = urlParams.get('mode');

  const mapModeToPage = {
    resetPassword: <NewPasswordPage />,
    verifyEmail: <Navigate to={ROUTES.HOME} />,
    default: <Navigate to={ROUTES.HOME} />,
  };

  return (
    mapModeToPage[mode as keyof typeof mapModeToPage] || mapModeToPage.default
  );
};
