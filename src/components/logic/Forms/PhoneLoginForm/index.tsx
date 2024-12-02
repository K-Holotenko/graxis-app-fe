import { Alert, Form, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PhoneInputFormItem } from 'src/components/ui/FormItems/PhoneInputFormItem';
import { SubmitButtonFormItem } from 'src/components/ui/FormItems/SubmitButtonFormItem';
import { FORMS, TEXT } from 'src/config/constants';
import { useAuthPhoneErrorCheck } from 'src/hooks/useAuthPhoneErrorCheck';
import { useRecaptcha } from 'src/hooks/useRecaptcha';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { handlePhoneAuth } from 'src/utils/handlePhoneAuth';
import 'src/components/logic/Forms/PhoneRegistrationForm/styles.scss';

interface PhoneLoginFormValuesProps {
  phone: string;
}

export const PhoneLoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginWithPhoneNumber } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { isPhoneInvalid, onFieldsChange } = useAuthPhoneErrorCheck(form);

  useRecaptcha({ buttonId: 'phone-login-btn' });

  const onFinish = (values: PhoneLoginFormValuesProps) => {
    const navigateToVerification = () => {
      navigate(`${ROUTES.VERIFICATION_CODE}?from=${ROUTES.LOGIN}`);
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
      name={FORMS.PHONE_LOGIN_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFieldsChange={onFieldsChange}
      className="phone-form"
      requiredMark={false}
      form={form}
    >
      <PhoneInputFormItem label={TEXT.PHONE} className="phone-input" />
      {!isPhoneInvalid && (
        <Typography.Text className="phone-sms-text">
          {TEXT.SEND_SMS}
        </Typography.Text>
      )}
      {errorMessage && (
        <Alert message={errorMessage} type="error" banner showIcon={false} />
      )}
      <button
        className="display-none"
        id="phone-login-btn"
        aria-hidden="true"
      />
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
    </Form>
  );
};
