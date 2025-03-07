import { AuthForms } from 'src/components/AuthForms';
import { EmailRegistrationForm } from 'src/pages/RegistrationPage/children/EmailRegistrationForm';
import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { AuthPhoneForm } from 'src/components/AuthPhoneForm';
import { ROUTES } from 'src/router/routes';

import { REGISTRATION_PAGE_CONFIG } from './utils/config';

const tabItems = [
  {
    label: REGISTRATION_PAGE_CONFIG.FORM.EMAIL_TAB.TITLE,
    key: REGISTRATION_PAGE_CONFIG.FORM.EMAIL_TAB.KEY,
    children: <EmailRegistrationForm />,
  },
  {
    label: REGISTRATION_PAGE_CONFIG.FORM.PHONE_TAB.TITLE,
    key: REGISTRATION_PAGE_CONFIG.FORM.PHONE_TAB.KEY,
    children: <AuthPhoneForm route={ROUTES.REGISTRATION} />,
  },
];

export const RegistrationPage = () => (
  <PageContainer pageTitle={REGISTRATION_PAGE_CONFIG.PAGE_TITLE}>
    <AuthLayout>
      <AuthForms
        items={tabItems}
        defaultActiveTabKey={REGISTRATION_PAGE_CONFIG.FORM.EMAIL_TAB.KEY}
        title={REGISTRATION_PAGE_CONFIG.FORM.TITLE}
      />
    </AuthLayout>
  </PageContainer>
);
