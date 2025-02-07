import { Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCountdown } from 'src/hooks/useCountdown';
import { ButtonTypes, FORMS, TEXT } from 'src/config/constants';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { Button } from 'src/components/Button';
import { NotificationType, useNotification } from 'src/hooks/useNotification';

import styles from './styles.module.scss';

export const VerificationForm = () => {
  const [isValid, setIsValid] = useState(false);
  const [form] = Form.useForm();

  const { openNotification } = useNotification();

  const { verifyCode } = useAuthStore();
  const navigate = useNavigate();

  const triggerNotification = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const { timer, isDisabled, startCountdown } = useCountdown(5);
  const buttonClass = isDisabled
    ? `${styles.verifySmsBtn} .verif-sms-btn-disabled`
    : `${styles.verifySmsBtn} ${styles.verifySmsBtnActive}`;

  //  TODO logic for resending code

  const handleSubmit = async (values: { code: string }) => {
    await verifyCode(values.code, triggerNotification)
      .then(() => {
        navigate(ROUTES.HOME);
      })
      .catch(() => {
        form.resetFields(['code']);
      });
  };

  const handleChange = (value: string) => {
    form.setFieldsValue({ code: value });
  };

  const label = isDisabled
    ? `${TEXT.SEND_SMS_AGAIN} (${timer}${TEXT.SEC})`
    : TEXT.SEND_SMS_AGAIN;

  const sanitizeCode = (str: string) => str.replace(/\D/g, '');

  const codeValue = Form.useWatch(['code'], form);

  useEffect(() => {
    startCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form
      .validateFields()
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
          onClick={startCountdown}
          isDisabled={false}
          className={buttonClass}
        />
      </Form.Item>
      <Form.Item
        name="code"
        validateTrigger="onBlur"
        className={styles.formItemCode}
        rules={[VALIDATION_CONDITION.VERIFICATION_CODE]}
      >
        <Input.OTP
          inputMode="numeric"
          formatter={sanitizeCode}
          onChange={handleChange}
        />
      </Form.Item>
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
