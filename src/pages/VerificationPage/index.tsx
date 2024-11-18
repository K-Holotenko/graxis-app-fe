import { PageContainer } from 'src/components/ui/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { VerificationLayout } from 'src/layouts/VerificationLayout';

import { VERIFICATION_PAGE_CONSTANTS } from './utils/constants';

export const VerificationPage = () => (
  <PageContainer pageTitle={VERIFICATION_PAGE_CONSTANTS.PAGE_TITLE}>
    <AuthLayout imageSrc={VERIFICATION_PAGE_CONSTANTS.IMAGE_SRC}>
      <VerificationLayout />
    </AuthLayout>
  </PageContainer>
);
