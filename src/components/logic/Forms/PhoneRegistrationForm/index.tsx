import { Alert, Form, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CheckboxFormItem } from 'src/components/ui/FormItems/CheckboxFormItem';
import { PhoneInputFormItem } from 'src/components/ui/FormItems/PhoneInputFormItem';
import { SubmitButtonFormItem } from 'src/components/ui/FormItems/SubmitButtonFormItem';
import { FORMS, TEXT } from 'src/config/constants';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { useAuthPhoneErrorCheck } from 'src/hooks/useAuthPhoneErrorCheck';
import { useRecaptcha } from 'src/hooks/useRecaptcha';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { handlePhoneAuth } from 'src/utils/handlePhoneAuth';
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
      <PhoneInputFormItem label={TEXT.PHONE} className="phone-input" />
      {!isPhoneInvalid && (
        <Typography.Text className="phone-sms-text">
          {TEXT.SEND_SMS}
        </Typography.Text>
      )}
      <CheckboxFormItem
        label={TEXT.ALLOW_DATA_PROCESSING}
        name="agreement"
        rules={[VALIDATION_CONDITION.REQUIRED]}
      />
      {errorMessage && (
        <Alert message={errorMessage} type="error" banner showIcon={false} />
      )}
      <button
        className="display-none"
        id="phone-registration-btn"
        aria-hidden="true"
      />
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
    </Form>
  );
};
