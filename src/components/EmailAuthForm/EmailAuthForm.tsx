import React from 'react';
import { EmailForm } from '../EmailForm/EmailForm';
import { CheckboxComponent } from '../CheckboxComponent/CheckboxComponent';

export const EmailAuthForm: React.FC = () => (
  <>
    <EmailForm />
    <CheckboxComponent />
  </>
);
