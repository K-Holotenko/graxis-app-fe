import { Form } from 'antd';

import { EmailInputFormItem } from 'src/components/ui/FormItems/EmailInputFormItem';
import { PasswordInputFormItem } from 'src/components/ui/FormItems/PasswordInputFormItem';
import { SubmitButtonFormItem } from 'src/components/ui/FormItems/SubmitButtonFormItem';
import { FORMS, TEXT } from 'src/config/constants';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { useAuthStore } from 'src/stores/authStore';

interface EmailLoginFormValues {
  email: string;
  password: string;
}

export const EmailLoginForm = () => {
  const { loginWithEmail } = useAuthStore();

  const onFinish = (values: EmailLoginFormValues) => {
    loginWithEmail(values.email, values.password);
  };
  const onFinishFailed = () => {};

  return (
    <Form
      name={FORMS.EMAIL_LOGIN_FORM}
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
        rules={[VALIDATION_CONDITION.REQUIRED]}
        placeholder={TEXT.INPUT_PASSWORD}
      />
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
    </Form>
  );
};
