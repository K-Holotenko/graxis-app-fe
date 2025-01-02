import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AuthForms } from 'src/components/AuthForms';
import { EmailLoginForm } from 'src/components/logic/Forms/EmailLoginForm';
import { PhoneLoginForm } from 'src/components/logic/Forms/PhoneLoginForm';
import { PageContainer } from 'src/components/ui/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import { LOGIN_PAGE_CONFIG } from './utils/config';

const tabItems = [
  {
    label: LOGIN_PAGE_CONFIG.FORM.EMAIL_TAB.TITLE,
    key: LOGIN_PAGE_CONFIG.FORM.EMAIL_TAB.KEY,
    children: <EmailLoginForm />,
  },
  {
    label: LOGIN_PAGE_CONFIG.FORM.PHONE_TAB.TITLE,
    key: LOGIN_PAGE_CONFIG.FORM.PHONE_TAB.KEY,
    children: <PhoneLoginForm />,
  },
];

export const LoginPage = () => {
  const { isAuthorized } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      isAuthorized &&
      [ROUTES.LOGIN, ROUTES.REGISTRATION].includes(location.pathname)
    )
      navigate(ROUTES.HOME);
  }, [navigate, isAuthorized, location.pathname]);

  return (
    <PageContainer pageTitle={LOGIN_PAGE_CONFIG.PAGE_TITLE}>
      <AuthLayout imageSrc={LOGIN_PAGE_CONFIG.IMAGE_SRC}>
        <AuthForms
          items={tabItems}
          defaultActiveTabKey={LOGIN_PAGE_CONFIG.FORM.EMAIL_TAB.KEY}
          title={LOGIN_PAGE_CONFIG.FORM.TITLE}
        />
      </AuthLayout>
    </PageContainer>
  );
};
