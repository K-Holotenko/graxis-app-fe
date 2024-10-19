import { PageContainer } from '../../components/ui/PageContainer';
import { AuthLayout } from '../../layouts/AuthLayout';
import { REGISTRATION_PAGE_CONSTANTS } from './utils/constants';

export const RegistrationPage = () => (
  <PageContainer pageTitle={REGISTRATION_PAGE_CONSTANTS.PAGE_TITLE}>
    <AuthLayout imageSrc={REGISTRATION_PAGE_CONSTANTS.IMAGE_SRC}>
      <div>Registration</div>
    </AuthLayout>
  </PageContainer>
);
