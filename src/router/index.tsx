import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { VerifyEmailPage } from 'src/pages/VerifyEmailPage';
import { PublicationsPage } from 'src/pages/PublicationsPage';
import { SettingsPage } from 'src/pages/SettingsPage';

import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.VERIFY_EMAIL,
    element: <VerifyEmailPage />,
  },
  {
    path: ROUTES.REGISTRATION,
    element: <RegistrationPage />,
  },
  {
    path: ROUTES.VERIFICATION_CODE,
    element: <VerificationPage />,
  },
  {
    path: ROUTES.PUBLICATIONS,
    element: <PublicationsPage />,
  },
  {
    path: ROUTES.SETTINGS,
    element: <SettingsPage />,
  },
]);
