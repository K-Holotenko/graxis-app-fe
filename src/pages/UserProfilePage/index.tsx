import { useEffect } from 'react';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ProfileLayout } from 'src/layouts/ProfileLayout';
import { useUserStore } from 'src/stores/userStore';

import { USER_PROFILE_CONFIG } from './utils/config';

export const UserProfilePage = () => {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(showError);
  }, [fetchUser]);

  return (
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
};
function showError(err: string): void {
  throw new Error('Function not implemented.');
}
