import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ProfileLayout } from 'src/layouts/ProfileLayout';

import { USER_PROFILE_CONFIG } from './utils/config';

export const UserProfilePage = () => (
  <PageContainer pageTitle={USER_PROFILE_CONFIG.PAGE_TITLE}>
    <AppLayout>
      <ProfileLayout
        headerContent={undefined}
        leftContent={undefined}
        topContent={undefined}
        bottomContent={undefined}
      />
    </AppLayout>
  </PageContainer>
);
