import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthForms } from 'src/components/AuthForms';
import { EmailLoginForm } from 'src/pages/LoginPage/children/EmailLoginForm';
import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { useUserStore } from 'src/stores/userStore';

export const LoginPage = () => {
  const { isAuthorized } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();
  const isFullyAuthorized = isAuthorized && !!user;

  useEffect(() => {
    if (
      isFullyAuthorized &&
      [ROUTES.LOGIN, ROUTES.REGISTRATION].includes(location.pathname)
    )
      navigate(ROUTES.HOME);
  }, [navigate, isFullyAuthorized, location.pathname]);

  return (
    <PageContainer pageTitle="Авторизація">
      <AuthLayout>
        <AuthForms title="Авторизація">
          <EmailLoginForm />
        </AuthForms>
      </AuthLayout>
    </PageContainer>
  );
};
