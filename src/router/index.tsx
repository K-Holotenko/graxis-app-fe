import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import { VerifyEmailPage } from 'src/pages/VerifyEmailPage';
import { PublicationFormPage } from 'src/pages/PublicationFormPage';
import { PublicationPage } from 'src/pages/PublicationPage';
import { SearchPage } from 'src/pages/SearchPage';
import { UserProfilePage } from 'src/pages/UserProfilePage';
import { AddUserInfoPage } from 'src/pages/AddUserInfoPage';
import { MyPublicationsPage } from 'src/pages/MyPublicationsPage';
import { NotFoundPage } from 'src/pages/NotFoundPage';
import { ErrorPage } from 'src/pages/ErrorPage';
import { PublicUserProfile } from 'src/pages/PublicUserProfile';
import { BookingPage } from 'src/pages/BookingPage';
import App from 'src/App';

import { PrivateRoute } from './PrivateRoute';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
      { path: ROUTES.REGISTRATION, element: <RegistrationPage /> },
      {
        path: ROUTES.ADD_PUBLICATION,
        element: (
          <PrivateRoute>
            <PublicationFormPage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.EDIT_PUBLICATION,
        element: (
          <PrivateRoute>
            <PublicationFormPage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.PUBLICATION,
        element: <PublicationPage />,
      },
      {
        path: ROUTES.BOOKING_BASE,
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.BOOKING,
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
      },
      { path: ROUTES.SEARCH_RESULTS, element: <SearchPage /> },
      {
        path: ROUTES.USER_PROFILE,
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.NOTIFICATIONS_BASE,
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.PAYMENT,
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.PRIVACY_POLICY,
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.FAQ,
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
      { path: ROUTES.ADD_USER_INFO, element: <AddUserInfoPage /> },
      {
        path: ROUTES.MY_PUBLICATIONS,
        element: (
          <PrivateRoute>
            <MyPublicationsPage />
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.PUBLIC_USER_PROFILE,
        element: <PublicUserProfile />,
      },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
