import { Form, InputNumber } from 'antd';
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
}

export const PhoneInputFormItem = ({
  label = 'Phone Number', className,
}: PhoneInputFormItemProps) => {

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
      <InputNumber
        addonBefore="+380"
        controls={false}
        style={{ width: '100%' }}
        placeholder={TEXT.INPUT_PHONE}
      />
    </Form.Item>
  )
};
