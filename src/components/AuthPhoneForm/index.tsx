import { ConfigProvider, Form, Typography } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  VALIDATION_CONDITION,
  VALIDATION_MESSAGE,
} from 'src/config/validation';
import { FORMS, TEXT } from 'src/config/constants';
import { useRecaptcha } from 'src/hooks/useRecaptcha';
import { ROUTES } from 'src/router/routes';
import { useAuthStore } from 'src/stores/authStore';
import { handlePhoneAuth } from 'src/utils/handlePhoneAuth';
import { Button } from 'src/components/Button';
import { Input, InputType } from 'src/components/Input';
import { Checkbox } from 'src/components/Checkbox/index';
import { theme } from 'src/config/theme';

import styles from './styles.module.scss';

interface AuthPhoneFormProps {
  route: string;
}

export const AuthPhoneForm = ({ route }: AuthPhoneFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginWithPhoneNumber } = useAuthStore();
  const [, setErrorMessage] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = e.target.value.replace(/\D/g, '');

      form.setFieldValue('phone', sanitizedValue);
    },
    [form]
  );

  useRecaptcha({ buttonId: 'phone-auth-button' });

  const onFinish = (values: { phone: string }) => {
    const navigateToVerification = () => {
      navigate(`${ROUTES.VERIFICATION_CODE}?from=${route}`);
    };

    handlePhoneAuth(
      values.phone,
      loginWithPhoneNumber,
      navigateToVerification,
      setErrorMessage
    );
  };

  const rules = [
    { required: true, message: VALIDATION_MESSAGE.REQUIRED },
    {
      pattern: VALIDATION_CONDITION.PHONE_INPUT.pattern,
      message: VALIDATION_MESSAGE.INVALID_PHONE,
    },
  ];

  const allValues = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [form, allValues]);

  const isRegistration = route === ROUTES.REGISTRATION;

  return (
    <ConfigProvider theme={localTheme}>
      <Form
        name={FORMS.PHONE_AUTH_FORM}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        form={form}
      >
        <Form.Item
          label={TEXT.PHONE}
          className={styles.formItemPhone}
          name="phone"
          validateTrigger="onBlur"
          rules={rules}
        >
          <Input
            type={InputType.TEL}
            maxLength={9}
            addonBefore="+380"
            className={styles.phoneInput}
            placeholder={TEXT.INPUT_PHONE}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Typography.Paragraph className={styles.helperText}>
          {TEXT.SEND_SMS}
        </Typography.Paragraph>
        {isRegistration && (
          <Form.Item
            valuePropName="checked"
            name="agreement"
            rules={[VALIDATION_CONDITION.CHECKED]}
            className={styles.agreement}
          >
            <Checkbox label={TEXT.ALLOW_DATA_PROCESSING} />
          </Form.Item>
        )}
        <button
          className="display-none"
          id="phone-auth-button"
          aria-hidden="true"
        />
        <Form.Item>
          <Button htmlType="submit" isDisabled={!isValid} label={TEXT.SUBMIT} />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

const localTheme = {
  components: {
    Form: {
      labelColor: theme.N5,
    },
  },
};
