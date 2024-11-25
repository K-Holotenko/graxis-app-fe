import { Form, Input } from 'antd';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from '../../../../config/validation';
import { TEXT } from 'config/constants';

interface FieldType {
  phone: string;
}

interface PhoneInputFormItemProps {
  label: string;
  className: string;
  setFieldValue: (name: string, value: string) => void;
}

export const PhoneInputFormItem = ({
  label = 'Phone Number',
  className,
  setFieldValue,
}: PhoneInputFormItemProps) => (
  <Form.Item<FieldType>
    label={label}
    className={className}
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
    <Input
      type="tel"
      maxLength={9}
      addonBefore="+380"
      style={{ width: '100%' }}
      placeholder={TEXT.INPUT_PHONE}
      onChange={(e) => {
        setFieldValue('phone', e.target.value.replace(/\D/g, ''));
      }}
    />
  </Form.Item>
);
