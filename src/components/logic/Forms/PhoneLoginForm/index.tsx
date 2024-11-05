import { Form, Typography } from 'antd';

import { FORMS, TEXT } from '../../../../config/constants';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { PhoneInputFormItem } from '../../../ui/FormItems/PhoneInputFormItem';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';
import { useEffect, useState } from 'react';
import { RecaptchaVerifier } from 'firebase/auth';
import { firebaseAuth } from 'config/firebase';
import { ROUTES } from 'router/routes';

interface PhoneLoginFormValuesProps {
  phone: string;
}

export const PhoneLoginForm = () => {
  const navigate = useNavigate();
  const { loginWithPhoneNumber } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    window.recaptchaVerifier = new RecaptchaVerifier(
      firebaseAuth,
      'phone-login-btn',
      {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
          //  @ts-expect-error fff
          grecaptcha.reset();
        },
        'expired-callback': () => {
          window.recaptchaVerifier.clear();
          // @ts-expect-error fff
          grecaptcha.reset();
        },
        'error-callback': () => {
          window.recaptchaVerifier.clear();
          // @ts-expect-error fff
          grecaptcha.reset();
        },
      },

    );

    setMounted(true);
  }, [mounted]);

  // TODO: Revisit user phone number verification and choose one of the following approaches:
  // 1. Store the user's phone number in Firestore and check against it when necessary to ensure validity and uniqueness.
  // 2. Send the verification code, handle any errors that Firebase Auth may throw, and return the user to the registration step if validation fails.
  // 3. Use Firebase Auth Admin SDK with Cloud Functions to manage verification on the server side for more flexible control.

  const onFinish = async (values: PhoneLoginFormValuesProps) => {
    const phoneNumber = `+380${values.phone}`;
    sessionStorage.setItem('phone', phoneNumber);

    try {
      await loginWithPhoneNumber(phoneNumber);
      navigate(ROUTES.VERIFICATIONCODE);
    } catch (error) {
      console.error(error);
    }
  }

  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.PHONE_LOGIN_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PhoneInputFormItem label={TEXT.PHONE} />
      <Typography>
        {TEXT.SEND_SMS}
      </Typography>
      <SubmitButtonFormItem
        title={TEXT.SUBMIT}
        className="mt-20"
        id="phone-login-btn"
      />
    </Form>
  );
};