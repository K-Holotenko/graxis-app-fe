import { useCallback, useEffect, useState } from 'react';
import { ConfigProvider, Form } from 'antd';

import { FORMS, REGEXS, TEXT } from 'src/config/constants';
import { VALIDATION_CONDITION } from 'src/config/validation';
import { useAuthStore } from 'src/stores/authStore';
import { Button } from 'src/components/Button/index';
import { Input, InputType } from 'src/components/Input';

import styles from './styles.module.scss';

interface EmailLoginFormValues {
  email: string;
  password: string;
}

export const EmailLoginForm = () => {
  const { loginWithEmail } = useAuthStore();
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(false);

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

  const onFinish = (values: EmailLoginFormValues) => {
    loginWithEmail(values.email, values.password);
  };
  const onFinishFailed = () => {};

  return (
    <ConfigProvider theme={localTheme}>
      <Form
        name={FORMS.EMAIL_LOGIN_FORM}
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
          className={styles.marginBottm}
        >
          <Input
            onChange={onChange}
            type={InputType.EMAIL}
            placeholder={TEXT.INPUT_EMAIL}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={TEXT.PASSWORD}
          rules={[VALIDATION_CONDITION.REQUIRED]}
          validateTrigger="onBlur"
          validateStatus={isValid ? 'success' : undefined}
          className={styles.marginBottom}
        >
          <Input type={InputType.PASSWORD} placeholder={TEXT.INPUT_PASSWORD} />
        </Form.Item>
        <Form.Item className={styles.buttonMargin}>
          <Button htmlType="submit" isDisabled={!isValid} label={TEXT.SUBMIT} />
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
