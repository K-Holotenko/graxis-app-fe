import { useCallback } from 'react';
import { Form } from 'antd';

import { FORMS, REGEXS, TEXT } from 'src/config/constants';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { useAuthStore } from 'src/stores/authStore';
import { Button } from 'src/components/Button/index';
import { Input } from 'src/components/Input';

import './styles.css';

interface EmailLoginFormValues {
  email: string;
  password: string;
}

export const EmailLoginForm = () => {
  const { loginWithEmail } = useAuthStore();
  const form = Form.useFormInstance();

  const onChange = useCallback(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldValue(
        'email',
        e.target.value.replace(REGEXS.notAsciiChars, '')
      );
    },
    [form]
  );

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
      <Form.Item
        label={TEXT.EMAIL}
        name="email"
        rules={[VALIDATION_CONDITION.EMAIL]}
      >
        <Input onChange={onChange} />
      </Form.Item>
      <Form.Item
        name="password"
        label={TEXT.PASSWORD}
        rules={[VALIDATION_CONDITION.REQUIRED]}
        validateFirst
      >
        <Input placeholder={TEXT.INPUT_PASSWORD} />
      </Form.Item>
      <Form.Item>
        <Button label={TEXT.SUBMIT} className="mt-20" />
      </Form.Item>
    </Form>
  );
};
