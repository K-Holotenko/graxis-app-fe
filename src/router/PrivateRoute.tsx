import { Navigate } from 'react-router-dom';

import { ROUTES } from './routes';
import { useAuthStore } from '../stores/authStore';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { isAuthorized } = useAuthStore();

  return isAuthorized ? children : <Navigate to={ROUTES.LOGIN} />;
};
