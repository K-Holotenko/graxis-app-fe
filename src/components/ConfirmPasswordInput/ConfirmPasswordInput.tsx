import React from 'react';
import { Form } from 'antd';
import { InputField } from '../InputField/InputField';
import { auth } from '../../constants/auth/auth';

export const ConfirmPasswordInput: React.FC = () => {
  const form = Form.useFormInstance();

  return (
    <InputField
      name="confirm"
      label={auth.confirmPasswordLabel}
      rules={[
        { required: true, message: auth.confirmPasswordRequiredMessage },
        {
          validator(_, value) {
            if (!value || form.getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error(`${auth.confirmPasswordNotMatchMessage}`)
            );
          },
        },
      ]}
      placeholder={auth.passwordPlaceholder}
      type="password"
      dependencies={['password']}
      hasFeedback
    />
  );
};
