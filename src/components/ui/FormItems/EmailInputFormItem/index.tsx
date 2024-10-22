import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { TEXT } from '../../../../config/constants';

interface FieldType {
  email: string;
}

interface EmailInputFormItemProps {
  label: string;
  rules?: Rule[];
  placeholder?: string;
  helperText: string;
}

export const EmailInputFormItem = ({
  label = 'Email',
  rules = [],
  placeholder = TEXT.INPUT_EMAIL,
  helperText = TEXT.HELPER_TEXT_EMAIL,
}: EmailInputFormItemProps) => (
  <Form.Item<FieldType>
    label={label}
    name="email"
    rules={rules}
    help={helperText}
  >
    <Input placeholder={placeholder} />
  </Form.Item>
);
