import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { RegistrationPage } from 'pages/RegistrationPage';
import { ROUTES } from './routes';
import { VerificationPage } from '../pages/VerificationPage';
import { VerifyEmailPage } from 'pages/VerifyEmailPage';

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
]);
