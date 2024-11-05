import { AuthForms } from 'components/logic/AuthForms';
import { PhoneRegistrationForm } from 'components/logic/Forms/PhoneRegistrationForm';
import { PageContainer } from 'components/ui/PageContainer';
import { AuthLayout } from 'layouts/AuthLayout';
import { REGISTRATION_PAGE_CONFIG } from './utils/config';
import { EmailRegistrationForm } from 'components/logic/Forms/EmailRegistrationForm';

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
