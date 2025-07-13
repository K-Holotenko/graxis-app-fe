import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from 'src/stores/authStore';
import { AppLoadingPage } from 'src/pages/AppLoadingPage';

import { ROUTES } from './routes';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { isAppInitializing, user } = useAuthStore();

  if (isAppInitializing) {
    return <AppLoadingPage />;
  }

  return user ? children : <Navigate to={ROUTES.LOGIN} />;
};
