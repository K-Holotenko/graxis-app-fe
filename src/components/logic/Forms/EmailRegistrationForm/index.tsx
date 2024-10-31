import { Form } from 'antd';

import { FORMS, TEXT } from '../../../../config/constants';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { PasswordInputFormItem } from '../../../ui/FormItems/PasswordInputFormItem';
import { EmailInputFormItem } from '../../../ui/FormItems/EmailInputFormItem';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from '../../../../config/validation';
import { CheckboxFormItem } from '../../../ui/FormItems/CheckboxFormItem';
import { useAuthStore } from '../../../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'router/routes';

interface EmailRegistrationFormValues {
  email: string;
  password: string;
}

export const EmailRegistrationForm = () => {
  const navigate = useNavigate();
  const { registerWithEmail } = useAuthStore();

  const onFinish = (values: EmailRegistrationFormValues) => {
    registerWithEmail(values.email, values.password).then(() => {
      navigate(ROUTES.VERIFY_EMAIL);
    });
  };
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.EMAIL_REGISTRATION_FORM}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <EmailInputFormItem label={TEXT.EMAIL} />
      <PasswordInputFormItem
        label={TEXT.PASSWORD}
        name="password"
        rules={[VALIDATION_CONDITION.REQUIRED]}
      />
      <PasswordInputFormItem
        label={TEXT.CONFIRMATION_PASSWORD}
        name="confirmationPassword"
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
