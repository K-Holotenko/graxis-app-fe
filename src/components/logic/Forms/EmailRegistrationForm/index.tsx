import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { CheckboxFormItem } from 'src/components/ui/FormItems/CheckboxFormItem';
import { EmailInputFormItem } from 'src/components/ui/FormItems/EmailInputFormItem';
import { PasswordInputFormItem } from 'src/components/ui/FormItems/PasswordInputFormItem';
import { SubmitButtonFormItem } from 'src/components/ui/FormItems/SubmitButtonFormItem';
import { FORMS, TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';

import { CREATE_PASSWORD_VALIDATION_CONDITIONS } from './utils';

interface EmailRegistrationFormValues {
  email: string;
  password: string;
}

export const EmailRegistrationForm = () => {
  const navigate = useNavigate();
  const { registerWithEmail } = useAuthStore();

  const onFinish = (values: EmailRegistrationFormValues) => {
    registerWithEmail(values.email, values.password).then(() =>
      navigate(ROUTES.VERIFY_EMAIL)
    );
  };
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.EMAIL_REGISTRATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <EmailInputFormItem
        label={TEXT.EMAIL}
        rules={[VALIDATION_CONDITION.EMAIL]}
      />
      <PasswordInputFormItem
        label={TEXT.PASSWORD}
        name="password"
        rules={CREATE_PASSWORD_VALIDATION_CONDITIONS}
        placeholder={TEXT.INPUT_PASSWORD}
      />
      <PasswordInputFormItem
        label={TEXT.CONFIRMATION_PASSWORD}
        name="confirmationPassword"
        placeholder={TEXT.INPUT_PASSWORD}
        rules={[
          VALIDATION_CONDITION.REQUIRED,
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error(VALIDATION_MESSAGE.CONFIRMATION_PASSWORD)
              );
            },
          }),
        ]}
      />
      <CheckboxFormItem
        label={TEXT.ALLOW_DATA_PROCESSING}
        name="agreement"
        rules={[VALIDATION_CONDITION.REQUIRED]}
      />
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
    </Form>
  );
};
