import { AuthForms } from 'src/components/AuthForms';
import { EmailRegistrationForm } from 'src/components/logic/Forms/EmailRegistrationForm';
import { PhoneRegistrationForm } from 'src/components/logic/Forms/PhoneRegistrationForm';
import { PageContainer } from 'src/components/ui/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';

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
    children: <PhoneRegistrationForm />,
  },
];

export const RegistrationPage = () => (
  <PageContainer pageTitle={REGISTRATION_PAGE_CONFIG.PAGE_TITLE}>
    <AuthLayout imageSrc={REGISTRATION_PAGE_CONFIG.IMAGE_SRC}>
      <AuthForms
        items={tabItems}
        defaultActiveTabKey={REGISTRATION_PAGE_CONFIG.FORM.EMAIL_TAB.KEY}
        title={REGISTRATION_PAGE_CONFIG.FORM.TITLE}
      />
    </AuthLayout>
  </PageContainer>
);
