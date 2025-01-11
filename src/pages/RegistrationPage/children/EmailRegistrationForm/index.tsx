import { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, Form } from 'antd';
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
import styles from './styles.module.scss';

interface EmailRegistrationFormValues {
  email: string;
  password: string;
}

export const EmailRegistrationForm = () => {
  const navigate = useNavigate();
  const { registerWithEmail } = useAuthStore();
  const [isValid, setIsValid] = useState(false);

  const [form] = Form.useForm();

  // Watch all values
  const allValues = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [form, allValues]);

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
    <ConfigProvider theme={localTheme}>
      <Form
        name={FORMS.EMAIL_REGISTRATION_FORM}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        requiredMark={false}
      >
        <Form.Item
          label={TEXT.EMAIL}
          name="email"
          rules={[VALIDATION_CONDITION.EMAIL]}
          validateTrigger="onBlur"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input placeholder={TEXT.INPUT_EMAIL} onChange={onChange} />
        </Form.Item>
        <Form.Item
          name="password"
          label={TEXT.PASSWORD}
          rules={CREATE_PASSWORD_VALIDATION_CONDITIONS}
          validateTrigger="onBlur"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input
            placeholder={TEXT.INPUT_PASSWORD}
            type={InputType.PASSWORD}
            id="password"
          />
        </Form.Item>
        <Form.Item
          name="confirmationPassword"
          label={TEXT.CONFIRMATION_PASSWORD}
          validateTrigger="onBlur"
          validateStatus={isValid ? 'success' : undefined}
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
          <Input
            placeholder={TEXT.INPUT_PASSWORD}
            type={InputType.PASSWORD}
            id="duplicated-password"
          />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name="agreement"
          rules={[VALIDATION_CONDITION.REQUIRED]}
          className={styles.marginBottom}
        >
          <Checkbox label={TEXT.ALLOW_DATA_PROCESSING} />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            isDisabled={!isValid}
            label={TEXT.SUBMIT}
            className={styles.buttonMargin}
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    Form: {
      labelColor: '#4F4F4F',
      itemMarginBottom: 12,
    },
  },
};
