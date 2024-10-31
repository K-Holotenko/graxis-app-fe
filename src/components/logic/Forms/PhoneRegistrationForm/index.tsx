import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier } from 'firebase/auth';
import { firebaseAuth } from '../../../../config/firebase';
import { useAuthStore } from '../../../../stores/authStore';
import { ROUTES } from '../../../../router/routes';
import { FORMS, TEXT } from '../../../../config/constants';
import { PhoneInputFormItem } from '../../../ui/FormItems/PhoneInputFormItem';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { CheckboxFormItem } from '../../../ui/FormItems/CheckboxFormItem';
import { VALIDATION_CONDITION } from '../../../../config/validation';

interface PhoneRegistrationFormValuesProps {
  phone: string;
}

export const PhoneRegistrationForm = () => {
  const navigate = useNavigate();
  const { loginWithPhoneNumber } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    window.recaptchaVerifier = new RecaptchaVerifier(
      firebaseAuth,
      'phone-registration-btn',
      {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
          // @ts-expect-error fff
          grecaptcha.reset();
        },
        'expired-callback': () => {
          // @ts-expect-error fff
          grecaptcha.reset();
        },
        'error-callback': () => {
          // @ts-expect-error fff
          grecaptcha.reset();
        },
      }
    );
    setMounted(true);
  }, [mounted]);

  const onFinish = async (values: PhoneRegistrationFormValuesProps) => {
    const phoneNumber = values.phone.trim();

    sessionStorage.setItem('phone', phoneNumber);

    try {
      if (!window.recaptchaVerifier)
        throw new Error('reCAPTCHA не ініціалізовано');

      await loginWithPhoneNumber(phoneNumber);

      navigate(ROUTES.VERIFICATION);
    } catch (error) {
      console.error('Помилка при авторизації:', error);
    }
  };

  return (
    <Form
      name={FORMS.PHONE_REGISTRATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={() => {}}
    >
      <PhoneInputFormItem label={TEXT.PHONE} />
      <CheckboxFormItem
        label={TEXT.ALLOW_DATA_PROCESSING}
        name="agreement"
        rules={[VALIDATION_CONDITION.REQUIRED]}
      />
      <SubmitButtonFormItem
        title={TEXT.SUBMIT}
        className="mt-20"
        id="phone-registration-btn"
      />
    </Form>
  );
};
