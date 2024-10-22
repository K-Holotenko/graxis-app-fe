import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { EmailLoginForm } from '../../components/logic/Forms/EmailLoginForm';
import { PhoneLoginForm } from '../../components/logic/Forms/PhoneLoginForm';
import { PageContainer } from '../../components/ui/PageContainer';
import { AuthLayout } from '../../layouts/AuthLayout';
import { useAuthStore } from '../../stores/authStore';
import { LOGIN_PAGE_CONSTANTS } from './utils/constants';
import { ROUTES } from '../../router/routes';

const tabItems = [
  {
    label: LOGIN_PAGE_CONSTANTS.FORM.EMAIL_TAB.TITLE,
    key: LOGIN_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY,
    children: <EmailLoginForm />,
  },
  {
    label: LOGIN_PAGE_CONSTANTS.FORM.PHONE_TAB.TITLE,
    key: LOGIN_PAGE_CONSTANTS.FORM.PHONE_TAB.KEY,
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
    <PageContainer pageTitle={LOGIN_PAGE_CONSTANTS.PAGE_TITLE}>
      <AuthLayout
        imageSrc={LOGIN_PAGE_CONSTANTS.IMAGE_SRC}
        items={tabItems}
        defaultActiveTabKey={LOGIN_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY}
        title={LOGIN_PAGE_CONSTANTS.FORM.TITLE}
      />
    </PageContainer>
  );
};
