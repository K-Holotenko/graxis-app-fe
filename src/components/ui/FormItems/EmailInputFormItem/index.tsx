import { Form, Input } from 'antd';
import { VALIDATION_MESSAGE } from '../../../../config/validation';

interface FieldType {
  email: string;
}

interface EmailInputFormItemProps {
  label: string;
}

export const EmailInputFormItem = ({
  label = 'Email',
}: EmailInputFormItemProps) => (
  <Form.Item<FieldType>
    label={label}
    name="email"
    rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
  >
    <Input />
  </Form.Item>
);
