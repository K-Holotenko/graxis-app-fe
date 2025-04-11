import { ReactNode, useState } from 'react';
import { Form } from 'antd';
import { useLocation } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ProfileLayout } from 'src/layouts/ProfileLayout';
import { useUserStore } from 'src/stores/userStore';

import { UpdateProfileDialog } from './children/PersonalInfoTab/UpdateProfileDialog';
import { PersonalInfoTab } from './children/PersonalInfoTab';
import { Sidebar } from './children/Sidebar';
import { NotificationTab } from './children/NotificationsTab';
import { PaymentTab } from './children/PaymentTab';
import { PrivacyPolicyTab } from './children/PrivacyPolicyTab';
import { FaqTab } from './children/FaqTab';

export const UserProfilePage = () => {
  const [form] = Form.useForm();
  const { user } = useUserStore();
  const location = useLocation();

  const [isPersonalInfoEditModeEnabled, setIsPersonalInfoEditModeEnabled] =
    useState(false);
  const [isContactInfoEditModeEnabled, setIsContactInfoEditModeEnabled] =
    useState(false);
  const [isPersonalInfoValid, setIsPersonalInfoValid] = useState(true);
  const [isContactInfoValid, setIsContactInfoValid] = useState(true);

  const handlePersonalInfoValidation = (valid: boolean) => {
    setIsPersonalInfoValid(valid);
  };
  const handleContactInfoValidation = (valid: boolean) => {
    setIsContactInfoValid(valid);
  };

  const handlePersonalInfoEditClick = (isEdit: boolean) => {
    setIsPersonalInfoEditModeEnabled(isEdit);

    form.setFieldsValue({
      name: user?.name,
      surname: user?.surname,
      avatarUrl: user?.avatarUrl,
    });
  };

  const handleContactInfoEditClick = (isEdit: boolean) => {
    setIsContactInfoEditModeEnabled(isEdit);

    form.setFieldsValue({
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    });
  };

  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const handleShowDialog = (shouldShow: boolean) =>
    setShouldShowDialog(shouldShow);

  const tabComponents: { [key: string]: ReactNode } = {
    [ROUTES.NOTIFICATIONS]: <NotificationTab />,
    [ROUTES.PAYMENT]: <PaymentTab />,
    [ROUTES.PRIVACY_POLICY]: <PrivacyPolicyTab />,
    [ROUTES.FAQ]: <FaqTab />,
    [ROUTES.USER_PROFILE]: (
      <PersonalInfoTab
        handleShowDialog={handleShowDialog}
        onPersonalInfoEditClick={handlePersonalInfoEditClick}
        onContactInfoEditClick={handleContactInfoEditClick}
        onPersonalInfoValidation={handlePersonalInfoValidation}
        onContactInfoValidation={handleContactInfoValidation}
        isPersonalInfoEditModeEnabled={isPersonalInfoEditModeEnabled}
        isContactInfoEditModeEnabled={isContactInfoEditModeEnabled}
        shouldShowDialog={shouldShowDialog}
        isValid={isPersonalInfoValid && isContactInfoValid}
        form={form}
      />
    ),
  };

  return (
    <PageContainer pageTitle="Профіль">
      <AppLayout>
        <ProfileLayout
          title="Профіль"
          tabContent={tabComponents[location.pathname]}
          sidebar={<Sidebar />}
          dialog={
            shouldShowDialog && (
              <UpdateProfileDialog
                onPersonalInfoEditClick={handlePersonalInfoEditClick}
                onContactInfoEditClick={handleContactInfoEditClick}
                handleShowDialog={handleShowDialog}
                isValid={isPersonalInfoValid && isContactInfoValid}
                form={form}
              />
            )
          }
        />
      </AppLayout>
    </PageContainer>
  );
};
