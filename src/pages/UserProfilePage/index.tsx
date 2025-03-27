import { Form } from 'antd';
import { useState } from 'react';

import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ProfileLayout } from 'src/layouts/ProfileLayout';

import { USER_PROFILE_CONFIG } from './utils/config';
import { ContactInfo } from './children/ContactInfo';
import { UpdateProfileDialog } from './children/UpdateProfileDialog';

export const UserProfilePage = () => {
  const [isEditingContactInfoForm, setIsEditingContactInfoForm] =
    useState(false);
  const [form] = Form.useForm();

  return (
    <PageContainer pageTitle={USER_PROFILE_CONFIG.PAGE_TITLE}>
      <AppLayout>
        <ProfileLayout
          headerContent={undefined}
          leftContent={undefined}
          topContent={undefined}
          bottomContent={
            <ContactInfo
              form={form}
              setIsEditingContactInfoForm={setIsEditingContactInfoForm}
              isEditingContactInfoForm={isEditingContactInfoForm}
            />
          }
        />
        {isEditingContactInfoForm && (
          <UpdateProfileDialog
            form={form}
            setIsEditingContactInfoForm={setIsEditingContactInfoForm}
          />
        )}
      </AppLayout>
    </PageContainer>
  );
};
