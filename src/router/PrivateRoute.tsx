import { Navigate } from 'react-router-dom';
import { JSX } from 'react';

import CookieService from 'src/services/CookieService';
import { useAuthStore } from 'src/stores/authStore';
import { useUserStore } from 'src/stores/userStore';

import { ROUTES } from './routes';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { isAuthorized } = useAuthStore();
  const { user } = useUserStore();
  const hasAccessToken = CookieService.hasCookie('accessToken');

  return isAuthorized && hasAccessToken && user ? (
    children
  ) : (
    // TODO Navigate to ROUTES.NOT_FOUND instead of ROUTES.LOGIN
    <Navigate to={ROUTES.LOGIN} />
  );
};
