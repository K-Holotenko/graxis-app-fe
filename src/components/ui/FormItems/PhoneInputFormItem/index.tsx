import { Form, InputNumber } from 'antd';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from '../../../../config/validation';

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
    validateTrigger="onBlur"
    rules={[
      { required: true, message: VALIDATION_MESSAGE.REQUIRED },
      {
        pattern: VALIDATION_CONDITION.PHONE_INPUT.pattern,
        message: VALIDATION_MESSAGE.INVALID_PHONE,
      },
    ]}
  >
    <InputNumber
      addonBefore="+380"
      controls={false}
      style={{ width: '100%' }}
    />
  </Form.Item>
);
