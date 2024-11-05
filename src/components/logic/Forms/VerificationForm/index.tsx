import { useState } from 'react';
import { Alert, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { useAuthStore } from 'stores/authStore';
import { FORMS, TEXT } from 'config/constants';
import { VerificationButtonFormItem } from 'components/ui/FormItems/VerificationButtonFormItem';
import { SubmitButtonFormItem } from 'components/ui/FormItems/SubmitButtonFormItem';
import { VALIDATION_CONDITION, VALIDATION_MESSAGE } from 'config/validation';

export const VerificationForm = () => {
  const [code, setCode] = useState('');
  const { verifyCode } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = await verifyCode(code);

      if (!user) {
        throw new Error(VALIDATION_MESSAGE.CODE_VERIFY_ERR);
      }

      navigate(ROUTES.HOME);
    } catch (err) {
      console.error(err);
      setErrorMessage(VALIDATION_MESSAGE.CODE_VERIFY_ERR);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      name={FORMS.VERIFICATION_FORM}
      layout="vertical"
    >
      <VerificationButtonFormItem
        className="mt-20"
        title={TEXT.SEND_SMS_AGAIN}
        code={code}
        id="code-resend-btn"
      />
      <Form.Item>
        <Input.OTP
          inputMode="numeric"
          formatter={(str) =>
            str.replace(VALIDATION_CONDITION.SMS_INPUT.pattern, '')
          }
          onChange={setCode}
        />
      </Form.Item>
      {errorMessage && (
        <Alert message={errorMessage} type="error" banner showIcon={false} />
      )}
      <Form.Item>
        <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
      </Form.Item>
    </Form>
  );
};
