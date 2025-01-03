import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCountdown } from 'src/hooks/useCountdown';
import { ButtonTypes, FORMS, TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import './styles.scss';
import { Button } from 'src/components/Button';

export const VerificationForm = () => {
  const [code, setCode] = useState('');
  const { verifyCode } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { timer, isDisabled, resetCountdown } = useCountdown(5);
  const buttonClass = isDisabled
    ? 'verif-sms-btn verif-sms-btn-disabled'
    : 'verif-sms-btn verif-sms-btn-active';

  //  TODO logic for resending code

  const handleSubmit = async () => {
    try {
      await verifyCode(code);
      navigate(ROUTES.HOME);
    } catch {
      setErrorMessage(VALIDATION_MESSAGE.CODE_VERIFY_ERR);
    }
  };

  const label = isDisabled
    ? `${TEXT.SEND_SMS_AGAIN} (${timer}${TEXT.SEC})`
    : TEXT.SEND_SMS_AGAIN;

  return (
    <Form
      onFinish={handleSubmit}
      name={FORMS.VERIFICATION_FORM}
      layout="vertical"
    >
      <Form.Item>
        <Button
          label={label}
          type={ButtonTypes.link}
          htmlType="button"
          onClick={resetCountdown}
          isDisabled={isDisabled}
          className={buttonClass}
        />
      </Form.Item>
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
      <Form.Item>
        <Button label={TEXT.SUBMIT} className="mt-20" />
      </Form.Item>
    </Form>
  );
};
