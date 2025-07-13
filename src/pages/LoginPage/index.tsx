import { AuthForms } from 'src/components/AuthForms';
import { EmailLoginForm } from 'src/pages/LoginPage/children/EmailLoginForm';
import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';

export const LoginPage = () => (
  <PageContainer pageTitle="Авторизація">
    <AuthLayout>
      <AuthForms title="Авторизація">
        <EmailLoginForm />
      </AuthForms>
    </AuthLayout>
  </PageContainer>
);
