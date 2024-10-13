import React from 'react';
import { Form } from 'antd';
import { PhoneInput } from '../PhoneInput/PhoneInput';

export const PhoneForm: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} name="phone_auth" layout="vertical" requiredMark={false}>
      <PhoneInput />
    </Form>
  );
};
