import React from 'react';
import { DocumentTitle } from '../../components/DocumentTitle/DocumentTitle';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { auth } from '../../constants/auth/auth';

export const RegistrationPage: React.FC = () => {
  return (
    <>
      <DocumentTitle>{auth.documentTitleReg}</DocumentTitle>
      <AuthLayout />
    </>
  );
};
