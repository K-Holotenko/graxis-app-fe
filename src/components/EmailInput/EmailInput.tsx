import React from 'react';
import { InputField } from '../InputField/InputField';
import { auth } from '../../constants/auth/auth';

export const EmailInput: React.FC = () => {
  return (
    <InputField
      name="email"
      label={auth.emailLabel}
      rules={[
        { type: 'email', message: auth.emailInvalidMessage },
        { required: true, message: auth.emailRequiredMessage },
      ]}
      placeholder={auth.emailPlaceholder}
      type="email"
    />
  );
};
