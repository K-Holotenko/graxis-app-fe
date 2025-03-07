import { Navigate } from 'react-router-dom';
import { JSX } from 'react';

import CookieService from 'src/services/CookieService';
import { useAuthStore } from 'src/stores/authStore';

import { ROUTES } from './routes';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { isAuthorized } = useAuthStore();

  const hasAccessToken = CookieService.hasCookie('accessToken');

  return isAuthorized && hasAccessToken ? (
    children
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};
