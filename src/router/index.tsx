import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ROUTES } from './routes';
import { PrivateRoute } from './PrivateRoute';
import { EmailVerifiedPage } from '../pages/EmailVerifiedPage';

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
    path: ROUTES.EMAIL_VERIFICATION,
    element: <EmailVerifiedPage />,
  },
  {
    path: ROUTES.REGISTRATION,
    element: <RegistrationPage />,
  },
]);
