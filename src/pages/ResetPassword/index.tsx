import { Form, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { useAuthStore } from 'src/stores/authStore';
import { ROUTES } from 'src/router/routes';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { Button } from 'src/components/Button';
import { Input } from 'src/components/Input';
import { FORMS, REGEXS } from 'src/config/constants';

import styles from './styles.module.scss';

const { Title } = Typography;

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const { resetPassword } = useAuthStore();
  const { openNotification } = useNotification();

  const emailValues = Form.useWatch(['email'], form);

  const triggerNotification = (description: string) => {
    openNotification(NotificationType.ERROR, 'Помилка', description);
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [form, emailValues]);

  const onChange = useCallback(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldValue(
        'email',
        e.target.value.replace(REGEXS.notAsciiChars, '')
      );
    },
    [form]
  );

  const onFinish = (values: { email: string }) => {
    resetPassword(values.email, triggerNotification)
      .then(() =>
        navigate(ROUTES.CHECK_EMAIL, {
          state: { email: values.email, isResetPassword: true },
        })
      )
      .catch(() => {
        form.resetFields(['email']);
      });
  };

  return (
    <PageContainer pageTitle="Відновлення паролю">
      <AuthLayout>
        <Title level={2} className={styles.authPageTitle}>
          Відновлення паролю
        </Title>
        <Form
          name={FORMS.EMAIL_RESET_PASSWORD_FORM}
          layout="vertical"
          onFinish={onFinish}
          form={form}
          requiredMark={false}
        >
          <p className={styles.authPageDescription}>
            Ми надішлемо вам посилання на вказаний email для відновлення паролю
          </p>
          <Form.Item
            label="Email"
            name="email"
            rules={[VALIDATION_CONDITION.EMAIL]}
            validateTrigger="onBlur"
            validateStatus={isValid ? 'success' : undefined}
          >
            <Input placeholder="Введіть email" onChange={onChange} />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              isDisabled={!isValid}
              label="Отримати посилання"
              className={styles.buttonMargins}
            />
          </Form.Item>
        </Form>
      </AuthLayout>
    </PageContainer>
  );
};
