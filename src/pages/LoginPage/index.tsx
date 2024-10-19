import { LoginFormSection } from '../../components/logic/LoginFormSection';
import { PageContainer } from '../../components/ui/PageContainer';
import { AuthLayout } from '../../layouts/AuthLayout';
import { LOGIN_PAGE_CONSTANTS } from './utils/constants';

export const LoginPage = () => (
  <PageContainer pageTitle={LOGIN_PAGE_CONSTANTS.PAGE_TITLE}>
    <AuthLayout imageSrc={LOGIN_PAGE_CONSTANTS.IMAGE_SRC}>
      <LoginFormSection />
    </AuthLayout>
  </PageContainer>
);
