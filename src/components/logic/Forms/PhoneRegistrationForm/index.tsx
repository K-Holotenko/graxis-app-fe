import { useEffect, useState } from 'react';
import { Form, Typography } from 'antd';
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
      }
    );

    setMounted(true);
  }, [mounted]);

  // TODO: Revisit user phone number verification and choose one of the following approaches:
  // 1. Store the user's phone number in Firestore and check against it when necessary to ensure validity and uniqueness.
  // 2. Send the verification code, handle any errors that Firebase Auth may throw, and return the user to the registration step if validation fails.
  // 3. Use Firebase Auth Admin SDK with Cloud Functions to manage verification on the server side for more flexible control.

  const onFinish = async (values: PhoneRegistrationFormValuesProps) => {
    const phoneNumber = `+380${values.phone}`;

    sessionStorage.setItem('phone', phoneNumber);

    try {
      await loginWithPhoneNumber(phoneNumber);
      navigate(ROUTES.VERIFICATIONCODE);
    } catch (error) {
      console.error(error);
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
      <Typography>{TEXT.SEND_SMS}</Typography>
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
