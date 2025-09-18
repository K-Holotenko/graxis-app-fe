import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import { CheckEmailPage } from 'src/pages/CheckEmailPage';
import { PublicationFormPage } from 'src/pages/PublicationFormPage';
import { PublicationPage } from 'src/pages/PublicationPage';
import { SearchPage } from 'src/pages/SearchPage';
import { UserProfilePage } from 'src/pages/UserProfilePage';
import { AddUserInfoPage } from 'src/pages/AddUserInfoPage';
import { MyPublicationsPage } from 'src/pages/MyPublicationsPage';
import { NotFoundPage } from 'src/pages/NotFoundPage';
import { ErrorPage } from 'src/pages/ErrorPage';
import { PublicUserProfile } from 'src/pages/PublicUserProfile';
import { ResetPasswordPage } from 'src/pages/ResetPassword';
import { BookingPage } from 'src/pages/BookingPage';
import { AuthActionHandler } from 'src/components/AuthActionHandler';
import App from 'src/App';
import { BookingHistoryPage } from 'src/pages/BookingHistoryPage';

import { PrivateRoute } from './PrivateRoute';
import { ROUTES } from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to={ROUTES.SEARCH_RESULTS} /> },
      { path: ROUTES.SEARCH_RESULTS, element: <SearchPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.CHECK_EMAIL, element: <CheckEmailPage /> },
      { path: ROUTES.REGISTRATION, element: <RegistrationPage /> },
      { path: ROUTES.RESET_PASSWORD, element: <ResetPasswordPage /> },
      { path: ROUTES.ACTION, element: <AuthActionHandler /> },
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
      {
        path: ROUTES.BOOKINGS_HISTORY,
        element: (
          <PrivateRoute>
            <BookingHistoryPage />
          </PrivateRoute>
        ),
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
