import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import { VerificationPage } from 'src/pages/VerificationPage';
import { VerifyEmailPage } from 'src/pages/VerifyEmailPage';
import { AddPublicationPage } from 'src/pages/AddPublicationPage';
import { ItemPage } from 'src/pages/ItemPage';
import { SearchResultsPage } from 'src/pages/SearchResultsPage';
import { UserProfilePage } from 'src/pages/UserProfilePage';
import { AddUserInfoPage } from 'src/pages/AddUserInfoPage';

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
    element: <ItemPage />,
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
]);
