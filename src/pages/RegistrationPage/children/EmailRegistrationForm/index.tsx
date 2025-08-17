import { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { Checkbox } from 'src/components/Checkbox';
import { FORMS, REGEXS } from 'src/config/constants';
import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { Button } from 'src/components/Button/index';
import { Input, InputType } from 'src/components/Input';
import { theme } from 'src/config/theme';
import { NotificationType, useNotification } from 'src/hooks/useNotification';

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
  const { openNotification } = useNotification();

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

  const triggerNotification = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  const onFinish = (values: EmailRegistrationFormValues) => {
    registerWithEmail(values.email, values.password, triggerNotification)
      .then(() => navigate(ROUTES.VERIFY_EMAIL))
      .catch(() => {
        form.resetFields(['email']);
      });
  };

  return (
    <ConfigProvider theme={localTheme}>
      <Form
        name={FORMS.EMAIL_REGISTRATION_FORM}
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={false}
      >
        <Form.Item
          label="Пошта"
          name="email"
          rules={[VALIDATION_CONDITION.EMAIL]}
          validateTrigger="onBlur"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input placeholder="Введіть пошту" onChange={onChange} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          rules={CREATE_PASSWORD_VALIDATION_CONDITIONS}
          validateTrigger="onBlur"
          validateStatus={isValid ? 'success' : undefined}
        >
          <Input
            placeholder="Введіть парольS"
            type={InputType.PASSWORD}
            id="password"
          />
        </Form.Item>
        <Form.Item
          name="confirmationPassword"
          label="Повторіть пароль"
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
            placeholder="Введіть пароль"
            type={InputType.PASSWORD}
            id="duplicated-password"
          />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name="agreement"
          rules={[VALIDATION_CONDITION.CHECKED]}
          className={styles.marginBottom}
        >
          <Checkbox
            label={`Я даю згоду на обробку моїх персональних даних та підтверджую ознайомлення з угодою користувача`}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            isDisabled={!isValid}
            label="Продовжити"
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
      labelColor: theme.N5,
      itemMarginBottom: 12,
    },
  },
};
