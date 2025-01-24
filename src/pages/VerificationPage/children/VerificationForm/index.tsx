import { Alert, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCountdown } from 'src/hooks/useCountdown';
import { ButtonTypes, FORMS, TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { Button } from 'src/components/Button';

import styles from './styles.module.scss';

export const VerificationForm = () => {
  const [isValid, setIsValid] = useState(false);
  const [form] = Form.useForm();

  const { verifyCode } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const { timer, isDisabled, resetCountdown } = useCountdown(5);
  const buttonClass = isDisabled
    ? `${styles.verifySmsBtn} .verif-sms-btn-disabled`
    : `${styles.verifySmsBtn} ${styles.verifySmsBtnActive}`;

  //  TODO logic for resending code

  const handleSubmit = async (values: { code: string }) => {
    try {
      await verifyCode(values.code);
      navigate(ROUTES.HOME);
    } catch {
      setErrorMessage(VALIDATION_MESSAGE.CODE_VERIFY_ERR);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    const target = e.target as HTMLInputElement;

    form.setFieldsValue(target);
  };

  const label = isDisabled
    ? `${TEXT.SEND_SMS_AGAIN} (${timer}${TEXT.SEC})`
    : TEXT.SEND_SMS_AGAIN;

  const sanitizeCode = (str: string) => str.replace(/\D/g, '');

  const codeValue = Form.useWatch(['code'], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [form, codeValue]);

  return (
    <Form
      onFinish={handleSubmit}
      name={FORMS.VERIFICATION_FORM}
      layout="vertical"
      form={form}
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
      <Form.Item
        name="code"
        validateTrigger="onChange"
        className={styles.formItemCode}
        rules={[VALIDATION_CONDITION.VERIFICATION_CODE]}
      >
        <Input.OTP
          inputMode="numeric"
          formatter={sanitizeCode}
          onBlur={handleBlur}
        />
      </Form.Item>
      {errorMessage && (
        <Alert message={errorMessage} type="error" banner showIcon={false} />
      )}
      <Form.Item>
        <Button
          isDisabled={!isValid}
          htmlType="submit"
          label={TEXT.SUBMIT}
          className={styles.submitBtn}
        />
      </Form.Item>
    </Form>
  );
};
