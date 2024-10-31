import { Form } from 'antd';

import { FORMS, TEXT } from '../../../../config/constants';
import { SubmitButtonFormItem } from '../../../ui/FormItems/SubmitButtonFormItem';
import { PasswordInputFormItem } from '../../../ui/FormItems/PasswordInputFormItem';
import { EmailInputFormItem } from '../../../ui/FormItems/EmailInputFormItem';
import { VALIDATION_CONDITION } from '../../../../config/validation';
import { useAuthStore } from '../../../../stores/authStore';

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
        rules={[VALIDATION_CONDITION.PASSWORD]}
        placeholder={TEXT.INPUT_PASSWORD}
      />
      <SubmitButtonFormItem title={TEXT.SUBMIT} className="mt-20" />
    </Form>
  );
};
