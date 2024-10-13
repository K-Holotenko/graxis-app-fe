import React from 'react';
import { Form } from 'antd';
import { InputField } from '../InputField/InputField';
import { auth } from '../../constants/auth/auth';
import styles from './PhoneInput.module.scss';

export const PhoneInput: React.FC = () => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      {auth.prefix}
    </Form.Item>
  );

  return (
    <InputField
      className={styles.phoneInput}
      name="phone"
      label={auth.phoneNum}
      rules={[{ required: true, message: auth.phoneValidationMessage }]}
      placeholder={auth.phonePlaceholder}
      addonBefore={prefixSelector}
      type="phone"
    />
  );
};
