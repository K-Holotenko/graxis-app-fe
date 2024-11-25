import { useState } from 'react';
import { Alert, Form, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';
import { FORMS, TEXT } from '../../../../config/constants';
import { PhoneInputFormItem } from '../../../ui/FormItems/PhoneInputFormItem';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { CheckboxFormItem } from '../../../ui/FormItems/CheckboxFormItem';
import { VALIDATION_CONDITION } from '../../../../config/validation';
import { useRecaptcha } from 'hooks/useRecaptcha';
import { handlePhoneAuth } from 'utils/handlePhoneAuth';
import { ROUTES } from 'router/routes';
import { useAuthPhoneErrorCheck } from 'hooks/useAuthPhoneErrorCheck';
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
