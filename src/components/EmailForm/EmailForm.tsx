import { Form } from 'antd';
import { EmailInput } from '../EmailInput/EmailInput';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import { ConfirmPasswordInput } from '../ConfirmPasswordInput/ConfirmPasswordInput';

export const EmailForm = () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      name="register"
      scrollToFirstError
      layout="vertical"
      requiredMark={false}
    >
      <EmailInput />
      <PasswordInput />
      <ConfirmPasswordInput />
    </Form>
  );
};
