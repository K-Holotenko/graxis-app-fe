import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ROUTES } from './routes';
import { PrivateRoute } from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTRATION,
    element: <RegistrationPage />,
  },
]);
