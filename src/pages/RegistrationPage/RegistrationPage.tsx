import { auth } from '../../config/auth/auth';
import { DocumentTitle } from '../../components/DocumentTitle/DocumentTitle';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';

export const RegistrationPage = () => (
  <>
    <DocumentTitle>{auth.documentTitleReg}</DocumentTitle>
    <AuthLayout />
  </>
);
