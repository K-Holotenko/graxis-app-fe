import { ReactNode, useState } from 'react';
import { Form } from 'antd';
import { useLocation, matchPath } from 'react-router-dom';

import { ROUTES } from 'src/router/routes';
import { PageContainer } from 'src/layouts/PageContainer';
import { AppLayout } from 'src/layouts/AppLayout';
import { ProfileLayout } from 'src/layouts/ProfileLayout';
import { useAuthStore } from 'src/stores/authStore';

import { UpdateProfileDialog } from './children/PersonalInfoTab/UpdateProfileDialog';
import { PersonalInfoTab } from './children/PersonalInfoTab';
import { Sidebar } from './children/Sidebar';
import { NotificationTab } from './children/NotificationsTab';
import { PaymentTab } from './children/PaymentTab';
import { PrivacyPolicyTab } from './children/PrivacyPolicyTab';
import { FaqTab } from './children/FaqTab';

export const UserProfilePage = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const { user } = useAuthStore();

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

  // Function to get the current tab component based on route matching
  const getCurrentTabComponent = (): ReactNode => {
    const { pathname } = location;

    // Check for notifications with ID parameter
    if (matchPath({ path: ROUTES.NOTIFICATIONS }, pathname)) {
      return <NotificationTab />;
    }

    // Check for notifications base route
    if (matchPath({ path: ROUTES.NOTIFICATIONS_BASE }, pathname)) {
      return <NotificationTab />;
    }

    // Check for other routes
    if (pathname === ROUTES.PAYMENT) {
      return <PaymentTab />;
    }

    if (pathname === ROUTES.PRIVACY_POLICY) {
      return <PrivacyPolicyTab />;
    }

    if (pathname === ROUTES.FAQ) {
      return <FaqTab />;
    }

    // Default to PersonalInfoTab for user profile route
    return (
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
    );
  };

  return (
    <PageContainer pageTitle="Профіль">
      <AppLayout>
        <ProfileLayout
          title="Профіль"
          tabContent={getCurrentTabComponent()}
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
