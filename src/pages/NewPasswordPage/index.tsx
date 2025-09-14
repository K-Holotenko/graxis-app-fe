import { Form, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { PageContainer } from 'src/layouts/PageContainer';
import { AuthLayout } from 'src/layouts/AuthLayout';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { useAuthStore } from 'src/stores/authStore';
import { ROUTES } from 'src/router/routes';
import { NotificationType, useNotification } from 'src/hooks/useNotification';
import { Button } from 'src/components/Button';
import { Input, InputType } from 'src/components/Input';
import { FORMS, REGEXS } from 'src/config/constants';

import styles from './styles.module.scss';

const { Title } = Typography;

export const NewPasswordPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const actionCode = urlParams.get('oobCode');

  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);
  const { newPassword, verifyPasswordResetCode } = useAuthStore();
  const { openNotification } = useNotification();

  const passwordValues = Form.useWatch(['password'], form);

  const triggerNotification = useCallback(
    (description: string) => {
      openNotification(NotificationType.ERROR, 'Помилка', description);
    },
    [openNotification]
  );

  useEffect(() => {
    if (actionCode) {
      verifyPasswordResetCode(actionCode, triggerNotification);
    } else {
      triggerNotification('Код відновлення паролю не знайдено');
      navigate(ROUTES.RESET_PASSWORD);
    }
  }, [actionCode]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [form, passwordValues]);

  const onChange = useCallback(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      form.setFieldValue(
        'password',
        e.target.value.replace(REGEXS.notAsciiChars, '')
      );
    },
    [form]
  );

  const onFinish = (values: { password: string }) => {
    if (!actionCode) {
      return;
    }

    newPassword(actionCode, values.password, triggerNotification)
      .then(() => {
        navigate(ROUTES.LOGIN);
        openNotification(
          NotificationType.SUCCESS,
          'Успішно',
          'Ваш пароль було успішно змінено'
        );
      })
      .catch(() => {
        form.resetFields(['password']);
      });
  };

  return (
    <PageContainer pageTitle="Відновлення паролю">
      <AuthLayout>
        <Title level={2} className={styles.authPageTitle}>
          Введіть новий пароль
        </Title>
        <Form
          name={FORMS.NEW_PASSWORD_FORM}
          layout="vertical"
          onFinish={onFinish}
          form={form}
          requiredMark={false}
        >
          <Form.Item
            label="Новий пароль"
            name="password"
            rules={VALIDATION_CONDITION.PASSWORD}
            validateTrigger="onBlur"
            validateStatus={isValid ? 'success' : undefined}
          >
            <Input
              type={InputType.PASSWORD}
              placeholder="Введіть новий пароль"
              onChange={onChange}
              id="password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              isDisabled={!isValid}
              label="Змінити пароль"
              className={styles.buttonMargin}
            />
          </Form.Item>
        </Form>
      </AuthLayout>
    </PageContainer>
  );
};
