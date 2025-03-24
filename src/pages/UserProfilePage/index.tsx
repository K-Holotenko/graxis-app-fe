import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ProfileLayout } from 'src/layouts/ProfileLayout';
import { useUserStore } from 'src/stores/userStore';

import { USER_PROFILE_CONFIG } from './utils/config';
import { ContactInfo } from './children/ContactInfo';
import { CancelAndSaveButtons } from './children/CancelAndSaveButtons';

export const UserProfilePage = () => {
  const { isEditingContactInfoForm } = useUserStore();

  return (
    <PageContainer pageTitle={USER_PROFILE_CONFIG.PAGE_TITLE}>
      <AppLayout>
        <ProfileLayout
          headerContent={undefined}
          leftContent={undefined}
          topContent={undefined}
          bottomContent={<ContactInfo />}
        />
        {isEditingContactInfoForm && <CancelAndSaveButtons />}
      </AppLayout>
    </PageContainer>
  );
};
