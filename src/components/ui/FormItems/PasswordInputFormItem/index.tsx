import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

interface PasswordInputFormItemProps {
  label: string;
  name?: string;
  dependencies?: string[];
  rules?: Rule[];
}

export const PasswordInputFormItem = ({
  label = 'Password',
  name = 'password',
  dependencies = [],
  rules = [],
}: PasswordInputFormItemProps) => (
  <Form.Item
    name={name}
    label={label}
    dependencies={dependencies}
    rules={rules}
  >
    <Input.Password />
  </Form.Item>
);
