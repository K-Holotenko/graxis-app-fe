import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FORMS, TEXT } from '../../../../config/constants';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { PhoneInputFormItem } from '../../../ui/FormItems/PhoneInputFormItem';
import { VALIDATION_CONDITION } from '../../../../config/validation';
import { CheckboxFormItem } from '../../../ui/FormItems/CheckboxFormItem';
import { ROUTES } from '../../../../router/routes';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '../../../../config/firebase';
import { RecaptchaVerifier } from 'firebase/auth';
import { useAuthStore } from '../../../../stores/authStore';

interface PhoneRegistrationFormValues {
  phone: string;
}

// export const EmailRegistrationForm = () => {
//   const { registerWithEmail } = useAuthStore();

//   const onFinish = (values: EmailRegistrationFormValues) => {
//     registerWithEmail(values.email, values.password);
//   };
export const PhoneRegistrationForm = () => {
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);
  // const fictionalPhoneNumber = {
  //   phoneNumber: '+380123456789',
  //   code: '234512',
  // };

  useEffect(() => {
    if (mounted) return;

    window.recaptchaVerifier = new RecaptchaVerifier(
      firebaseAuth,
      'phone-registration-btn',
      {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
      }
    );

    setMounted(true);
  }, [mounted]);

  const { loginWithPhoneNumber } = useAuthStore();
  // const onFinish = (values: { phone: string }) => {
  //   sessionStorage.setItem('phone', values.phone);
  //   navigate(ROUTES.VERIFICATION);
  // };

  //const onFinish = (values: EmailRegistrationFormValues) => {
  //     registerWithEmail(values.email, values.password);
  //   };
  const onFinish = async (values: PhoneRegistrationFormValues) => {
    sessionStorage.setItem('phone', values.phone);

    try {
      // const confirmationResult =
      //   // await AuthService.signInWithPhoneNumber();
      // firebaseAuth,
      // fictionalPhoneNumber.phoneNumber,
      // window.recaptchaVerifier
      await loginWithPhoneNumber(values.phone, '');
      // const res = await confirmationResult.confirm(fictionalPhoneNumber.code);
      // console.log('user: ', res.user);

      navigate(ROUTES.VERIFICATION);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.PHONE_REGISTRATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
