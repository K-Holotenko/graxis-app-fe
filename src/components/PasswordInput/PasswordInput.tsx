import React from 'react';
import { InputField } from '../InputField/InputField';
import { auth } from '../../constants/auth/auth';

export const PasswordInput: React.FC = () => {
  return (
    <InputField
      name="password"
      label={auth.passwordLabel}
      rules={[{ required: true, message: auth.passwordRequiredMessage }]}
      placeholder={auth.passwordPlaceholder}
      type="password"
      hasFeedback
    />
  );
};
