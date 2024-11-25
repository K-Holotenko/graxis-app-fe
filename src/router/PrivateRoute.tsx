import { Navigate } from 'react-router-dom';

import { ROUTES } from './routes';
import { useAuthStore } from '../stores/authStore';
import CookieService from 'services/CookieService';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { isAuthorized } = useAuthStore();

  const hasAccessToken = CookieService.hasCookie('accessToken');

  return isAuthorized && hasAccessToken ? (
    children
  ) : (
    <Navigate to={ROUTES.REGISTRATION} />
  );
};
