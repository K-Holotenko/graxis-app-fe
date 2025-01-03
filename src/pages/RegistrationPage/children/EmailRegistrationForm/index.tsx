import { useCallback } from 'react';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Checkbox } from 'src/components/Checkbox';
import { FORMS, REGEXS, TEXT } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { Button } from 'src/components/Button/index';
import { Input, InputType } from 'src/components/Input';

import { CREATE_PASSWORD_VALIDATION_CONDITIONS } from './utils';

interface EmailRegistrationFormValues {
  email: string;
  password: string;
}

export const EmailRegistrationForm = () => {
  const navigate = useNavigate();
  const { registerWithEmail } = useAuthStore();
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
        rules={CREATE_PASSWORD_VALIDATION_CONDITIONS}
        validateFirst
      >
        <Input placeholder={TEXT.INPUT_PASSWORD} type={InputType.PASSWORD} />
      </Form.Item>
      <Form.Item
        name="confirmationPassword"
        label={TEXT.CONFIRMATION_PASSWORD}
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
        validateFirst
      >
        <Input placeholder={TEXT.INPUT_PASSWORD} />
      </Form.Item>
      <Form.Item
        valuePropName="checked"
        name="agreement"
        rules={[VALIDATION_CONDITION.REQUIRED]}
      >
        <Checkbox label={TEXT.ALLOW_DATA_PROCESSING} />
      </Form.Item>
      <Form.Item>
        <Button label={TEXT.SUBMIT} className="mt-20" />
      </Form.Item>
    </Form>
  );
};
