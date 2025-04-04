import { createBrowserRouter, Navigate } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { VerifyEmailPage } from 'src/pages/VerifyEmailPage';
import { AddPublicationPage } from 'src/pages/AddPublicationPage';
import { PublicationPage } from 'src/pages/PublicationPage';
import { SearchResultsPage } from 'src/pages/SearchResultsPage';
import { UserProfilePage } from 'src/pages/UserProfilePage';
import { AddUserInfoPage } from 'src/pages/AddUserInfoPage';
import { MyPublicationsPage } from 'src/pages/MyPublicationsPage';
import { NotFoundPage } from 'src/pages/NotFoundPage';

import { PrivateRoute } from './PrivateRoute';
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
    path: ROUTES.ADD_PUBLICATION,
    element: (
      <PrivateRoute>
        <AddPublicationPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.ITEM,
    element: <PublicationPage />,
  },
  {
    path: ROUTES.SEARCH_RESULTS,
    element: <SearchResultsPage />,
  },
  {
    path: ROUTES.USER_PROFILE,
    element: (
      <PrivateRoute>
        <UserProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.ADD_USER_INFO,
    element: <AddUserInfoPage />,
  },
  {
    path: ROUTES.MY_PUBLICATIONS,
    element: (
      <PrivateRoute>
        <MyPublicationsPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.NOT_FOUND} />,
  },
]);
