import { Form, Input } from 'antd';

import { TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';

interface FieldType {
  phone: string;
}

interface PhoneInputFormItemProps {
  label: string;
  className: string;
}

export const PhoneInputFormItem = ({
  label = 'Phone Number',
  className,
}: PhoneInputFormItemProps) => {
  const form = Form.useFormInstance();

  return (
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
          form.setFieldValue('phone', e.target.value.replace(/\D/g, ''));
        }}
      />
    </Form.Item>
  );
};
