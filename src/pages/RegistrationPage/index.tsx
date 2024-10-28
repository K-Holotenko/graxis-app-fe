import { EmailRegistrationForm } from '../../components/logic/Forms/EmailRegistrationForm';
import { PhoneRegistrationForm } from '../../components/logic/Forms/PhoneRegistrationForm';
import { PageContainer } from '../../components/ui/PageContainer';
import { AuthLayout } from '../../layouts/AuthLayout';
import { REGISTRATION_PAGE_CONSTANTS } from './utils/constants';
import { useLocation } from 'react-router-dom';

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

// export const RegistrationPage = () => (
//   <PageContainer pageTitle={REGISTRATION_PAGE_CONSTANTS.PAGE_TITLE}>
//     <AuthLayout
//       imageSrc={REGISTRATION_PAGE_CONSTANTS.IMAGE_SRC}
//       items={tabItems}
//       defaultActiveTabKey={REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY}
//       title={REGISTRATION_PAGE_CONSTANTS.FORM.TITLE}
//     />
//   </PageContainer>
// );

export const RegistrationPage = () => {
  const location = useLocation();
  const activeTabKey = new URLSearchParams(location.search).get('tab');

  return (
    <PageContainer pageTitle={REGISTRATION_PAGE_CONSTANTS.PAGE_TITLE}>
      <AuthLayout
        imageSrc={REGISTRATION_PAGE_CONSTANTS.IMAGE_SRC}
        items={tabItems}
        defaultActiveTabKey={
          activeTabKey || REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY
        }
        title={REGISTRATION_PAGE_CONSTANTS.FORM.TITLE}
      />
    </PageContainer>
  );
};
