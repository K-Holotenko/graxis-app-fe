import { Form, Input } from 'antd';
import { VALIDATION_MESSAGE } from '../../../../config/validation';

interface FieldType {
  phone: string;
}

interface PhoneInputFormItemProps {
  label: string;
}

export const PhoneInputFormItem = ({
  label = 'Phone Number',
}: PhoneInputFormItemProps) => (
  <Form.Item<FieldType>
    label={label}
    name="phone"
    rules={[{ required: true, message: VALIDATION_MESSAGE.REQUIRED }]}
  >
    {/* <InputNumber
      addonBefore="+380"
      controls={false}
      style={{ width: '100%' }}
    /> */}
    <Input />
  </Form.Item>
);
