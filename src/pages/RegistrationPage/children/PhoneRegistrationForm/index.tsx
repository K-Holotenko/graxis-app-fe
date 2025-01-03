import { Alert, Form, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FORMS, TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { useAuthPhoneErrorCheck } from 'src/hooks/useAuthPhoneErrorCheck';
import { useRecaptcha } from 'src/hooks/useRecaptcha';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { handlePhoneAuth } from 'src/utils/handlePhoneAuth';
import { Button } from 'src/components/Button';
import { Input, InputType } from 'src/components/Input';
import { Checkbox } from 'src/components/Checkbox';

import './styles.scss';

interface PhoneRegistrationFormValuesProps {
  phone: string;
}

export const PhoneRegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginWithPhoneNumber } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isPhoneInvalid, onFieldsChange } = useAuthPhoneErrorCheck(form);

  const handleInputChange = useCallback(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldValue('phone', e.target.value.replace(/\D/g, ''));
    },
    [form]
  );

  useRecaptcha({ buttonId: 'phone-registration-btn' });

  const onFinish = (values: PhoneRegistrationFormValuesProps) => {
    const navigateToVerification = () => {
      navigate(`${ROUTES.VERIFICATION_CODE}?from=${ROUTES.REGISTRATION}`);
    };

    handlePhoneAuth(
      values.phone,
      loginWithPhoneNumber,
      navigateToVerification,
      setErrorMessage
    );
  };

  const rules = [
    { required: true, message: VALIDATION_MESSAGE.REQUIRED },
    {
      pattern: VALIDATION_CONDITION.PHONE_INPUT.pattern,
      message: VALIDATION_MESSAGE.INVALID_PHONE,
    },
  ];

  return (
    <Form
      name={FORMS.PHONE_REGISTRATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      className="phone-form"
      form={form}
      onFieldsChange={onFieldsChange}
      requiredMark={false}
    >
      <Form.Item
        label={TEXT.PHONE}
        className="phone-input"
        name="phone"
        validateTrigger="onBlur"
        rules={rules}
      >
        <Input
          type={InputType.TEL}
          maxLength={9}
          addonBefore="+380"
          placeholder={TEXT.INPUT_PHONE}
          onChange={handleInputChange}
        />
      </Form.Item>
      {!isPhoneInvalid && (
        <Typography.Text className="phone-sms-text">
          {TEXT.SEND_SMS}
        </Typography.Text>
      )}
      <Form.Item
        valuePropName="checked"
        name="agreement"
        rules={[VALIDATION_CONDITION.REQUIRED]}
      >
        <Checkbox label={TEXT.ALLOW_DATA_PROCESSING} />
      </Form.Item>
      {errorMessage && (
        <Alert message={errorMessage} type="error" banner showIcon={false} />
      )}
      <button
        className="display-none"
        id="phone-registration-btn"
        aria-hidden="true"
      />
      <Form.Item>
        <Button label={TEXT.SUBMIT} className="mt-20" />
      </Form.Item>
    </Form>
  );
};
