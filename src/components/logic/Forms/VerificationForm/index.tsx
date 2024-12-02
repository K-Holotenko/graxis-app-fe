import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SubmitButtonFormItem } from 'src/components/ui/FormItems/SubmitButtonFormItem';
import { VerificationButtonFormItem } from 'src/components/ui/FormItems/VerificationButtonFormItem';
import { FORMS, TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

export const VerificationForm = () => {
  const [code, setCode] = useState('');
  const { verifyCode } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  //  TODO logic for resending code

  const handleSubmit = async () => {
    try {
      await verifyCode(code);
      navigate(ROUTES.HOME);
    } catch {
      setErrorMessage(VALIDATION_MESSAGE.CODE_VERIFY_ERR);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      name={FORMS.VERIFICATION_FORM}
      layout="vertical"
    >
      <VerificationButtonFormItem title={TEXT.SEND_SMS_AGAIN} />
      <Form.Item>
        <Input.OTP
          inputMode="numeric"
          formatter={(str) =>
            str.replace(VALIDATION_CONDITION.VERIFICATION_CODE.pattern, '')
          }
          size="large"
          onChange={setCode}
        />
      </Form.Item>
      {errorMessage && (
        <Alert message={errorMessage} type="error" banner showIcon={false} />
      )}
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
    </Form>
  );
};
