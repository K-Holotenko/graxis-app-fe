import { Alert, Form, Typography } from 'antd';
import { FORMS, TEXT } from '../../../../config/constants';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { PhoneInputFormItem } from '../../../ui/FormItems/PhoneInputFormItem';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';
import { useState } from 'react';
import { useRecaptcha } from 'hooks/useRecaptcha';
import { handlePhoneAuth } from 'utils/handlePhoneAuth';
import { ROUTES } from 'router/routes';
import '../PhoneRegistrationForm/styles.scss'
import { useAuthPhoneErrorCheck } from 'hooks/useAuthPhoneErrorCheck';

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

  // TODO: Revisit user phone number verification and choose one of the following approaches:
  // 1. Store the user's phone number in Firestore and check against it when necessary to ensure validity and uniqueness.
  // 2. Send the verification code, handle any errors that Firebase Auth may throw, and return the user to the registration step if validation fails.
  // 3. Use Firebase Auth Admin SDK with Cloud Functions to manage verification on the server side for more flexible control.

  const onFinish = (values: PhoneLoginFormValuesProps) => {
    const navigateToVerification = () => {
      navigate(`${ROUTES.VERIFICATIONCODE}?from=${ROUTES.LOGIN}`);
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
      className='phone-form' 
      requiredMark={false}
      form={form}
    >
      <PhoneInputFormItem label={TEXT.PHONE} className='phone-input' />
      {!isPhoneInvalid && (
        <Typography.Text className="phone-sms-text">{TEXT.SEND_SMS}</Typography.Text>
      )}
      {errorMessage && (
        <Alert message={errorMessage} type="error" banner showIcon={false} />
      )}
      <button
        className="display-none"
        id="phone-login-btn"
        aria-hidden="true"
      />
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20"  />
    </Form>
  );
};
