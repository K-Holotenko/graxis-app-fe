import { AuthLayout } from 'layouts/AuthLayout';
import { PageContainer } from '../../components/ui/PageContainer';
import { VERIFICATION_PAGE_CONSTANTS } from './utils/constants';
import { VerificationLayout } from 'layouts/VerificationLayout';

export const VerificationPage = () => (
  <PageContainer pageTitle={VERIFICATION_PAGE_CONSTANTS.PAGE_TITLE}>
    <AuthLayout
      imageSrc={VERIFICATION_PAGE_CONSTANTS.IMAGE_SRC}
    >
      <VerificationLayout />
    </AuthLayout>
  </PageContainer>
);
