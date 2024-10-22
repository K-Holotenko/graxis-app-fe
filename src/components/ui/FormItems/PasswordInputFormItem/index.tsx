import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { TEXT } from '../../../../config/constants';

interface PasswordInputFormItemProps {
  label: string;
  name?: string;
  dependencies?: string[];
  rules?: Rule[];
  placeholder: string;
  helperText: string;
}

export const PasswordInputFormItem = ({
  label = 'Password',
  name = 'password',
  dependencies = [],
  rules = [],
  placeholder = '',
  helperText = TEXT.HELPER_TEXT_PASSWORD,
}: PasswordInputFormItemProps) => (
  <Form.Item
    name={name}
    label={label}
    dependencies={dependencies}
    rules={rules}
    help={helperText}
  >
    <Input.Password placeholder={placeholder} />
  </Form.Item>
);
