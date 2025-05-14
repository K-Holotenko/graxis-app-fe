import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { RegistrationPage } from 'src/pages/RegistrationPage';
import { PublicationFormPage } from 'src/pages/PublicationFormPage';
import { PublicationPage } from 'src/pages/PublicationPage';
import { SearchPage } from 'src/pages/SearchPage';
import { MyPublicationsPage } from 'src/pages/MyPublicationsPage';
import { NotFoundPage } from 'src/pages/NotFoundPage';
import { AppLoadingPage } from 'src/pages/AppLoadingPage';
import { ErrorPage } from 'src/pages/ErrorPage';
import App from 'src/App';

import { PrivateRoute } from './PrivateRoute';
import { ROUTES } from './routes';

const UserProfilePage = lazy(() => import('src/pages/UserProfilePage'));
const AddUserInfoPage = lazy(() => import('src/pages/AddUserInfoPage'));
const VerifyEmailPage = lazy(() => import('src/pages/VerifyEmailPage'));

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
      { path: ROUTES.SEARCH_RESULTS, element: <SearchPage /> },
      {
        path: ROUTES.USER_PROFILE,
        element: (
          <PrivateRoute>
            <Suspense fallback={<AppLoadingPage />}>
              <UserProfilePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.NOTIFICATIONS,
        element: (
          <PrivateRoute>
            <Suspense fallback={<AppLoadingPage />}>
              <UserProfilePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.PAYMENT,
        element: (
          <PrivateRoute>
            <Suspense fallback={<AppLoadingPage />}>
              <UserProfilePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.PRIVACY_POLICY,
        element: (
          <PrivateRoute>
            <Suspense fallback={<AppLoadingPage />}>
              <UserProfilePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.FAQ,
        element: (
          <PrivateRoute>
            <Suspense fallback={<AppLoadingPage />}>
              <UserProfilePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: ROUTES.ADD_USER_INFO,
        element: (
          <Suspense fallback={<AppLoadingPage />}>
            <AddUserInfoPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.MY_PUBLICATIONS,
        element: (
          <PrivateRoute>
            <MyPublicationsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
  {
    path: '*',
    element: <Navigate to={ROUTES.NOT_FOUND} />,
  },
]);
