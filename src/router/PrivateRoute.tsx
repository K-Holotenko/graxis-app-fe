import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';
import { useUserStore } from 'src/stores/userStore';
import { AppLoadingPage } from 'src/pages/AppLoadingPage';

import { ROUTES } from './routes';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { isAuthorized, isAppInitializing } = useAuthStore();
  const { user } = useUserStore();

  if (isAppInitializing) {
    return <AppLoadingPage />;
  }

  return isAuthorized && user ? children : <Navigate to={ROUTES.LOGIN} />;
};
