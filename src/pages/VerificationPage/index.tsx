// import { EmailRegistrationForm } from '../../components/logic/Forms/EmailRegistrationForm';
// import { PhoneRegistrationForm } from '../../components/logic/Forms/PhoneRegistrationForm';
import { PageContainer } from '../../components/ui/PageContainer';

import { VerificationLayout } from '../../layouts/VerificationLayout';
import { VERIFICATION_PAGE_CONSTANTS } from './utils/constants';

// const tabItems = [
//   {
//     label: REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.TITLE,
//     key: REGISTRATION_PAGE_CONSTANTS.FORM.EMAIL_TAB.KEY,
//     children: <EmailRegistrationForm />,
//   },
//   {
//     label: REGISTRATION_PAGE_CONSTANTS.FORM.PHONE_TAB.TITLE,
//     key: REGISTRATION_PAGE_CONSTANTS.FORM.PHONE_TAB.KEY,
//     children: <PhoneRegistrationForm />,
//   },
// ];

export const VerificationPage = () => (
  <PageContainer pageTitle={VERIFICATION_PAGE_CONSTANTS.PAGE_TITLE}>
    <VerificationLayout
      imageSrc={VERIFICATION_PAGE_CONSTANTS.IMAGE_SRC}
      //   items={tabItems}
      title={VERIFICATION_PAGE_CONSTANTS.FORM.TITLE}
      message={VERIFICATION_PAGE_CONSTANTS.FORM.MESSAGE}
    />
  </PageContainer>
);
