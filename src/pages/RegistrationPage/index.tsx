import { AuthForms } from 'components/logic/AuthForms';
import { PhoneRegistrationForm } from 'components/logic/Forms/PhoneRegistrationForm';
import { PageContainer } from 'components/ui/PageContainer';
import { AuthLayout } from 'layouts/AuthLayout';
import { REGISTRATION_PAGE_CONSTANTS } from './utils/constants';
import { EmailRegistrationForm } from 'components/logic/Forms/EmailRegistrationForm';

const tabItems = [
  {
    label: REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.TITLE,
    key: REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY,
    children: <EmailRegistrationForm />,
  },
  {
    label: REGISTRATION_PAGE_CONSTANTS.FORM.PHONE_TAB.TITLE,
    key: REGISTRATION_PAGE_CONSTANTS.FORM.PHONE_TAB.KEY,
    children: <PhoneRegistrationForm />,
  },
];

export const RegistrationPage = () => (
  <PageContainer pageTitle={REGISTRATION_PAGE_CONSTANTS.PAGE_TITLE}>
    <AuthLayout imageSrc={REGISTRATION_PAGE_CONSTANTS.IMAGE_SRC}>
      <AuthForms
        items={tabItems}
        defaultActiveTabKey={REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY}
        title={REGISTRATION_PAGE_CONSTANTS.FORM.TITLE}
      />
    </AuthLayout>
  </PageContainer>
);
