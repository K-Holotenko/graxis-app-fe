import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

interface PasswordInputFormItemProps {
  label: string;
  name?: string;
  dependencies?: string[];
  rules?: Rule[];
  placeholder: string;
}

export const PasswordInputFormItem = ({
  label = 'Password',
  name = 'password',
  dependencies = [],
  rules = [],
  placeholder = '',
}: PasswordInputFormItemProps) => (
  <Form.Item
    name={name}
    label={label}
    dependencies={dependencies}
    rules={rules}
    validateFirst
  >
    <Input.Password placeholder={placeholder} />
  </Form.Item>
);
