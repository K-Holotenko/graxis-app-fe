import { AuthForms } from 'src/components/AuthForms';
import { EmailRegistrationForm } from 'src/pages/RegistrationPage/children/EmailRegistrationForm';
import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';

export const RegistrationPage = () => (
  <PageContainer pageTitle="Реєстрація">
    <AuthLayout>
      <AuthForms title="Реєстрація">
        <EmailRegistrationForm />
      </AuthForms>
    </AuthLayout>
  </PageContainer>
);
